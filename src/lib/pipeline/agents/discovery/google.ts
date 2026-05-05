/**
 * Discovery — Google Places agent.
 *
 * Runs ONLY when input has businessName + serviceArea (the no-URL admin flow).
 * Calls the Places API "Text Search" endpoint, picks the top match, then
 * fetches Place Details for hours/phone/photos/etc. Photos are downloaded
 * to Linode under kptdesigns/customer-<jobId>/places/<sha8>.<ext> and added
 * to findings.assetKeys so the curator + freeform builder treat them like
 * any other customer asset.
 *
 * Falls back gracefully:
 *   - No GOOGLE_PLACES_API_KEY → reports "skipped" and returns {}
 *   - No businessName/serviceArea on input → reports "skipped" and returns {}
 *   - API error → reports the error, returns {} (degrades, doesn't kill pipeline)
 */
import type { Agent } from "../types";
import { uploadFromUrl } from "../../customer-storage";

const PLACES_BASE = "https://places.googleapis.com/v1";
const PHOTO_FIELDS =
  "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.regularOpeningHours,places.rating,places.userRatingCount,places.editorialSummary,places.primaryType,places.photos";

const DETAILS_FIELDS =
  "id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,regularOpeningHours.weekdayDescriptions,rating,userRatingCount,editorialSummary,primaryType,photos";

const MAX_PHOTOS = 6;

export const googleAgent: Agent = {
  stage: "google",
  phase: "discovery",
  label: "Looking up Google business profile",

  async run({ jobId, input, report }) {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY?.replace(/^"|"$/g, "");
    if (!apiKey) {
      await report("GOOGLE_PLACES_API_KEY not set — skipping");
      return {};
    }
    if (!input.businessName) {
      await report("No business name provided — skipping");
      return {};
    }

    const query = [input.businessName, input.notes ?? ""].filter(Boolean).join(" ");

    await report(`Searching Google Places for "${input.businessName}"`);

    let placeId: string | undefined;
    try {
      const searchRes = await fetch(`${PLACES_BASE}/places:searchText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PHOTO_FIELDS,
        },
        body: JSON.stringify({ textQuery: query, maxResultCount: 3 }),
      });
      if (!searchRes.ok) {
        await report(`Places searchText HTTP ${searchRes.status}`);
        return {};
      }
      const searchJson = (await searchRes.json()) as {
        places?: Array<{ id: string }>;
      };
      placeId = searchJson.places?.[0]?.id;
      if (!placeId) {
        await report("No matching place found");
        return {};
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Places search failed: ${msg}`);
      return {};
    }

    let details: PlaceDetails | undefined;
    try {
      const detailRes = await fetch(`${PLACES_BASE}/places/${placeId}`, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": DETAILS_FIELDS,
        },
      });
      if (!detailRes.ok) {
        await report(`Places details HTTP ${detailRes.status}`);
        return {};
      }
      details = (await detailRes.json()) as PlaceDetails;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Places details failed: ${msg}`);
      return {};
    }

    const photoKeys: string[] = [];
    if (details.photos && details.photos.length > 0) {
      const slice = details.photos.slice(0, MAX_PHOTOS);
      await report(`Downloading ${slice.length} Place photos`);
      for (const photo of slice) {
        const photoUrl = `${PLACES_BASE}/${photo.name}/media?maxHeightPx=1200&maxWidthPx=1600&key=${apiKey}`;
        const stored = await uploadFromUrl(jobId, photoUrl, { kind: "asset" });
        if (stored) photoKeys.push(stored.key);
      }
    }

    const place = {
      placeId: details.id,
      name: details.displayName?.text ?? input.businessName,
      formattedAddress: details.formattedAddress,
      phone: details.nationalPhoneNumber,
      website: details.websiteUri,
      hours: details.regularOpeningHours?.weekdayDescriptions,
      rating: details.rating,
      userRatingCount: details.userRatingCount,
      photoKeys,
      editorialSummary: details.editorialSummary?.text,
      primaryType: details.primaryType,
    };

    await report(`Found ${place.name} (${place.rating ?? "no rating"})`);

    return {
      googlePlace: place,
      // Also append to assetKeys so curator + freeform see Place photos as
      // first-class customer assets.
      assetKeys: photoKeys,
    };
  },
};

type PlaceDetails = {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  rating?: number;
  userRatingCount?: number;
  editorialSummary?: { text?: string };
  primaryType?: string;
  photos?: Array<{ name: string }>;
};
