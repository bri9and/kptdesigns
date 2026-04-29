"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";
import { fakeChargeDeposit } from "../_lib/stripe-demo";

// Stripe.js types — react-stripe-js is NOT in this project's package.json,
// so we render a styled placeholder card field unless @stripe/react-stripe-js
// is added in a follow-up. For tonight, the BookTeeTime component renders
// its OWN minimal card-input placeholder that looks like Stripe Elements.

const bookingSchema = z.object({
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  players: z.coerce.number().min(1).max(4),
  cart: z.enum(["walking", "cart"]),
  discountCode: z.string().optional(),
});
type BookingForm = z.infer<typeof bookingSchema>;

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 6; h <= 17; h++) for (let m of [0, 15, 30, 45]) {
    const hh = ((h % 12) || 12);
    const mer = h < 12 ? "AM" : "PM";
    slots.push(`${hh}:${String(m).padStart(2, "0")} ${mer}`);
  }
  return slots;
})();

const RATE_18 = 28;
const CART_18 = 18;

export function BookTeeTime() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState<BookingForm | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingForm>({
    defaultValues: { players: 2, cart: "cart" },
  });
  const players = watch("players") ?? 2;
  const cart = watch("cart") ?? "cart";

  const total = useMemo(() => {
    const greens = RATE_18 * Number(players);
    const carts = cart === "cart" ? CART_18 * Number(players) : 0;
    return greens + carts;
  }, [players, cart]);

  function onContinue(data: BookingForm) {
    setSubmitted(data);
    setStep(2);
  }

  async function onConfirmDeposit() {
    if (!submitted) return;
    const result = await fakeChargeDeposit({
      amountCents: 1000 * Number(submitted.players),
      description: `Lake Arthur tee time deposit · ${submitted.date} ${submitted.time} · ${submitted.players} players`,
    });
    setConfirmation(result.confirmationId);
    setStep(3);
  }

  function downloadIcs() {
    if (!submitted || !confirmation) return;
    const dt = submitted.date.replace(/-/g, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lake Arthur Golf Club//EN",
      "BEGIN:VEVENT",
      `UID:${confirmation}@lakearthur.com`,
      `DTSTAMP:${dt}T120000Z`,
      `DTSTART:${dt}T120000Z`,
      `SUMMARY:Tee time at Lake Arthur Golf Club`,
      `DESCRIPTION:Confirmation ${confirmation} · ${submitted.players} players · ${submitted.cart === "cart" ? "with cart" : "walking"}`,
      "LOCATION:255 Isle Road, Butler, PA 16001",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `lake-arthur-${confirmation}.ics`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  return (
    <section id="book" className="la-book" aria-labelledby="la-book-title">
      <header className="la-book__intro">
        <p className="la-book__eyebrow">Book a tee time</p>
        <h2 id="la-book-title" className="la-book__title">Reserve your round.</h2>
        <p className="la-book__lede">
          Pick your date and time, hold your spot with a small refundable
          deposit, and we'll see you on the first tee.
        </p>
      </header>

      <div className="la-book__panel">
        <ol className="la-book__steps" aria-label="Booking steps">
          <li className={step >= 1 ? "is-active" : ""}>1 · Tee time</li>
          <li className={step >= 2 ? "is-active" : ""}>2 · Deposit</li>
          <li className={step >= 3 ? "is-active" : ""}>3 · Confirmation</li>
        </ol>

        {step === 1 && (
          <form onSubmit={handleSubmit(onContinue)} className="la-book__form" noValidate>
            <div className="la-book__row">
              <label className="la-book__field">
                <span>Date</span>
                <input type="date" {...register("date")} />
                {errors.date && <em>{errors.date.message}</em>}
              </label>
              <label className="la-book__field">
                <span>Time</span>
                <select {...register("time")}>
                  <option value="">Select…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <em>{errors.time.message}</em>}
              </label>
            </div>
            <div className="la-book__row">
              <label className="la-book__field">
                <span>Players</span>
                <select {...register("players", { valueAsNumber: true })}>
                  {[1,2,3,4].map((n) => <option key={n} value={n}>{n} player{n > 1 ? "s" : ""}</option>)}
                </select>
              </label>
              <fieldset className="la-book__field la-book__radios">
                <legend>Cart</legend>
                <label><input type="radio" value="cart" {...register("cart")} /> With cart</label>
                <label><input type="radio" value="walking" {...register("cart")} /> Walking</label>
              </fieldset>
            </div>
            <label className="la-book__field la-book__field--inline">
              <span>Discount code (optional)</span>
              <input type="text" {...register("discountCode")} placeholder="e.g. EARLYBIRD" />
            </label>
            <div className="la-book__total">
              <span>Estimated total</span>
              <strong>${total}</strong>
            </div>
            <button className="la-book__cta" type="submit">Continue to deposit →</button>
          </form>
        )}

        {step === 2 && submitted && (
          <div className="la-book__form">
            <p className="la-book__deposit-line">
              Holding your spot for <strong>{submitted.players} player{Number(submitted.players) > 1 ? "s" : ""}</strong> on <strong>{submitted.date}</strong> at <strong>{submitted.time}</strong>.
            </p>
            <div className="la-book__deposit">
              <span>$10 / player refundable hold</span>
              <strong>${10 * Number(submitted.players)}</strong>
            </div>
            <FakeCardField />
            <p className="la-book__deposit-fine">
              You'll be charged the round total at check-in. The deposit is fully refundable up to 24 hours before your tee time.
            </p>
            <div className="la-book__row la-book__row--end">
              <button type="button" className="la-book__back" onClick={() => setStep(1)}>← Edit reservation</button>
              <button type="button" className="la-book__cta" onClick={onConfirmDeposit}>Confirm reservation →</button>
            </div>
          </div>
        )}

        {step === 3 && submitted && confirmation && (
          <div className="la-book__success">
            <div className="la-book__seal" aria-hidden="true">✓</div>
            <h3>You're booked.</h3>
            <p className="la-book__conf">Confirmation <code>{confirmation}</code></p>
            <p className="la-book__summary">
              {submitted.players} player{Number(submitted.players) > 1 ? "s" : ""} · {submitted.date} at {submitted.time}{submitted.cart === "cart" ? " · with cart" : " · walking"}
            </p>
            <div className="la-book__row la-book__row--end">
              <button type="button" className="la-book__back" onClick={downloadIcs}>Add to calendar</button>
              <button type="button" className="la-book__cta" onClick={() => { setStep(1); setSubmitted(null); setConfirmation(null); }}>Book another</button>
            </div>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

// Stylized card-field placeholder. Visually mimics Stripe Elements.
// We do not render real Stripe Elements tonight (would require adding
// @stripe/react-stripe-js). Demo mode = visual fidelity only.
function FakeCardField() {
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  return (
    <div className="la-book__card" role="group" aria-label="Card details">
      <input
        className="la-book__card-num"
        type="text" inputMode="numeric" autoComplete="cc-number"
        placeholder="Card number"
        value={num}
        onChange={(e) => setNum(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))}
      />
      <input
        className="la-book__card-exp"
        type="text" inputMode="numeric" autoComplete="cc-exp"
        placeholder="MM / YY"
        value={exp}
        onChange={(e) => setExp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1 / "))}
      />
      <input
        className="la-book__card-cvc"
        type="text" inputMode="numeric" autoComplete="cc-csc"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
      />
    </div>
  );
}

const css = `
.la-book { padding: 8rem 5vw; background: ${palette.water}; color: ${palette.cream}; }
.la-book__intro { max-width: 640px; margin: 0 auto 4rem; text-align: center; }
.la-book__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-book__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.25rem; }
.la-book__lede { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; font-size: 1.05rem; line-height: 1.6; margin: 0; }
.la-book__panel { max-width: 720px; margin: 0 auto; background: rgba(244,239,223,0.06); border: 1px solid rgba(244,239,223,0.16); border-radius: 6px; padding: 2.5rem; backdrop-filter: blur(4px); }
.la-book__steps { list-style: none; padding: 0; margin: 0 0 2.5rem; display: flex; gap: 1.5rem; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.55; }
.la-book__steps li.is-active { opacity: 1; color: ${palette.dawn}; }
.la-book__form { display: flex; flex-direction: column; gap: 1.5rem; font-family: ${fonts.body}; }
.la-book__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.la-book__row--end { justify-content: flex-end; align-items: center; gap: 1.5rem; }
.la-book__field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; }
.la-book__field span, .la-book__field legend { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78; }
.la-book__field input, .la-book__field select { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.85rem 1rem; border-radius: 4px; font-family: inherit; font-size: 0.95rem; }
.la-book__field input:focus, .la-book__field select:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.25); }
.la-book__field em { color: ${palette.dawn}; font-size: 0.75rem; font-style: normal; }
.la-book__radios { border: 1px solid rgba(244,239,223,0.22); border-radius: 4px; padding: 0.7rem 1rem; background: rgba(244,239,223,0.04); }
.la-book__radios label { display: inline-flex; gap: 0.5rem; align-items: center; margin-right: 1.5rem; font-size: 0.95rem; }
.la-book__field--inline { grid-column: 1 / -1; }
.la-book__total { display: flex; justify-content: space-between; align-items: baseline; padding-top: 1.25rem; border-top: 1px solid rgba(244,239,223,0.18); font-family: ${fonts.body}; }
.la-book__total span { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.75; }
.la-book__total strong { font-family: ${fonts.display}; font-size: 1.6rem; font-weight: 400; color: ${palette.dawn}; }
.la-book__cta { background: ${palette.dawn}; color: ${palette.water}; border: none; padding: 0.95rem 1.6rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: transform 180ms, box-shadow 180ms; align-self: flex-start; }
.la-book__cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.35); }
.la-book__cta:focus-visible { outline: 2px solid ${palette.cream}; outline-offset: 2px; }
.la-book__back { background: transparent; color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.4); padding: 0.85rem 1.4rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.la-book__deposit { display: flex; justify-content: space-between; align-items: baseline; padding: 1.25rem 0; border-top: 1px solid rgba(244,239,223,0.18); border-bottom: 1px solid rgba(244,239,223,0.18); }
.la-book__deposit span { font-size: 0.85rem; opacity: 0.85; }
.la-book__deposit strong { font-family: ${fonts.display}; font-size: 1.7rem; font-weight: 400; color: ${palette.dawn}; }
.la-book__deposit-line { font-size: 0.95rem; opacity: 0.9; margin: 0; }
.la-book__deposit-fine { font-size: 0.78rem; opacity: 0.7; margin: 0; line-height: 1.55; }
.la-book__card { display: grid; grid-template-columns: 1fr 120px 80px; gap: 0.5rem; padding: 0.85rem 1rem; background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); border-radius: 4px; }
.la-book__card input { background: transparent; border: none; color: ${palette.cream}; font-family: ${fonts.body}; font-size: 0.95rem; outline: none; }
.la-book__card input::placeholder { color: rgba(244,239,223,0.5); }
.la-book__success { text-align: center; padding: 2rem 0; }
.la-book__seal { width: 64px; height: 64px; margin: 0 auto 1.5rem; border: 1px solid ${palette.dawn}; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: ${palette.dawn}; }
.la-book__success h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 2rem; margin: 0 0 0.75rem; }
.la-book__conf { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.8; margin: 0 0 0.5rem; }
.la-book__conf code { font-family: ${fonts.mono}; color: ${palette.dawn}; letter-spacing: 0.18em; }
.la-book__summary { font-family: ${fonts.display}; font-style: italic; opacity: 0.92; margin: 0 0 2rem; }
@media (prefers-reduced-motion: reduce) {
  .la-book__cta { transition: none; }
  .la-book__cta:hover { transform: none; }
}
@media (max-width: 720px) {
  .la-book__row { grid-template-columns: 1fr; }
  .la-book__card { grid-template-columns: 1fr; }
}
`;
