"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";
import { fakeChargeDeposit } from "../_lib/stripe-demo";

// v2 booking flow — paper background, moss CTAs, mono labels, Fraunces stat
// numerals. Keeps the v1 3-step state machine, RHF + zod validation, the
// fakeChargeDeposit call, and the .ics download. No translucent panel; the
// section sits flush on the paper page with thin rules above and below.

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
  for (let h = 6; h <= 17; h++) for (const m of [0, 15, 30, 45]) {
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
      <div className="la-book__inner">
        <header className="la-book__intro">
          <p className="la-book__eyebrow">
            <span>BOOK</span>
            <span className="la-book__rule" aria-hidden="true" />
            <span>TEE TIME</span>
          </p>
          <h2 id="la-book-title" className="la-book__title">
            Reserve your <em>round.</em>
          </h2>
          <p className="la-book__lede">
            Pick your date and time, hold your spot with a small refundable
            deposit, and we'll see you on the first tee.
          </p>
        </header>

        <ol className="la-book__steps" aria-label="Booking steps">
          <li className={step >= 1 ? "is-active" : ""}>01 · Tee time</li>
          <li className={step >= 2 ? "is-active" : ""}>02 · Deposit</li>
          <li className={step >= 3 ? "is-active" : ""}>03 · Confirmation</li>
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
                  <option value="">Select a time</option>
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
            <div className="la-book__row la-book__row--end">
              <button className="la-book__cta" type="submit">Continue to deposit →</button>
            </div>
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
            <p className="la-book__success-eyebrow">CONFIRMED</p>
            <h3 className="la-book__success-title">You're <em>booked.</em></h3>
            <p className="la-book__conf-label">Confirmation</p>
            <p className="la-book__conf-id"><code>{confirmation}</code></p>
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
// We do not render real Stripe Elements (would require adding
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
.la-book {
  padding: 6rem 2.5rem;
  background: ${palette.paper};
  color: ${palette.ink};
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.18);
  border-bottom: 1px solid rgba(22,20,15,0.18);
}
.la-book__inner { max-width: 760px; margin: 0 auto; }
.la-book__intro { display: flex; flex-direction: column; gap: 1.25rem; margin: 0 0 3rem; }
.la-book__eyebrow {
  display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-book__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-book__title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0; max-width: 16ch;
  font-variation-settings: "opsz" 144, "SOFT" 30;
}
.la-book__title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: "opsz" 96, "SOFT" 70;
}
.la-book__lede {
  font-family: ${fonts.body}; font-size: 1.02rem; line-height: 1.6;
  color: ${palette.ink}; opacity: 0.82; margin: 0; max-width: 50ch;
}
.la-book__steps {
  list-style: none; padding: 0 0 1.5rem; margin: 0 0 2.5rem;
  display: flex; gap: 2rem;
  border-bottom: 1px solid rgba(22,20,15,0.12);
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-book__steps li.is-active { color: ${palette.moss}; }
.la-book__form { display: flex; flex-direction: column; gap: 1.5rem; }
.la-book__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.la-book__row--end { justify-content: flex-end; align-items: center; gap: 1rem; grid-template-columns: auto auto; justify-self: end; }
.la-book__field { display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.92rem; }
.la-book__field span, .la-book__field legend {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash}; padding: 0;
}
.la-book__field input, .la-book__field select {
  background: ${palette.bone};
  border: 1px solid rgba(22,20,15,0.18);
  color: ${palette.ink};
  padding: 0.85rem 1rem; border-radius: 2px;
  font-family: ${fonts.body}; font-size: 0.95rem;
}
.la-book__field input:focus, .la-book__field select:focus {
  outline: none; border-color: ${palette.moss};
  box-shadow: 0 0 0 2px rgba(31,55,37,0.18);
}
.la-book__field em {
  color: ${palette.brick}; font-family: ${fonts.mono};
  font-size: 0.68rem; font-style: normal; letter-spacing: 0.16em; text-transform: uppercase;
}
.la-book__radios {
  border: 1px solid rgba(22,20,15,0.18);
  border-radius: 2px;
  padding: 0.75rem 1rem;
  background: ${palette.bone};
  display: flex; flex-direction: column; gap: 0.4rem;
}
.la-book__radios legend { padding: 0 0 0.4rem; }
.la-book__radios label { display: inline-flex; gap: 0.5rem; align-items: center; margin-right: 1rem; font-size: 0.92rem; color: ${palette.ink}; font-family: ${fonts.body}; }
.la-book__field--inline { grid-column: 1 / -1; }
.la-book__total {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(22,20,15,0.18);
  border-bottom: 1px solid rgba(22,20,15,0.18);
}
.la-book__total span {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-book__total strong {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: 2rem; color: ${palette.moss};
  font-variation-settings: "opsz" 96, "SOFT" 30;
}
.la-book__cta {
  background: ${palette.moss}; color: ${palette.bone};
  border: none;
  padding: 0.95rem 1.6rem; border-radius: 999px;
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  cursor: pointer;
  transition: background 180ms, transform 180ms;
}
.la-book__cta:hover { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-book__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-book__back {
  background: transparent; color: ${palette.ink};
  border: 1px solid rgba(22,20,15,0.28);
  padding: 0.85rem 1.4rem; border-radius: 999px;
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  cursor: pointer; transition: border-color 180ms, background 180ms;
}
.la-book__back:hover { border-color: ${palette.ink}; background: rgba(22,20,15,0.04); }
.la-book__deposit {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(22,20,15,0.18);
  border-bottom: 1px solid rgba(22,20,15,0.18);
}
.la-book__deposit span {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-book__deposit strong {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: 2rem; color: ${palette.moss};
  font-variation-settings: "opsz" 96, "SOFT" 30;
}
.la-book__deposit-line { font-family: ${fonts.body}; font-size: 0.98rem; line-height: 1.6; opacity: 0.85; margin: 0; }
.la-book__deposit-line strong { font-weight: 600; color: ${palette.ink}; }
.la-book__deposit-fine {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.08em;
  color: ${palette.ash}; margin: 0; line-height: 1.65;
}
.la-book__card {
  display: grid; grid-template-columns: 1fr 120px 80px; gap: 0.5rem;
  padding: 0.85rem 1rem;
  background: ${palette.bone};
  border: 1px solid rgba(22,20,15,0.18);
  border-radius: 2px;
}
.la-book__card input {
  background: transparent; border: none; color: ${palette.ink};
  font-family: ${fonts.body}; font-size: 0.95rem; outline: none;
}
.la-book__card input::placeholder { color: ${palette.ash}; }
.la-book__success {
  display: flex; flex-direction: column; gap: 0.85rem;
  padding: 1.5rem 0;
}
.la-book__success-eyebrow {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.brick}; margin: 0;
}
.la-book__success-title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0;
  font-variation-settings: "opsz" 144, "SOFT" 30;
}
.la-book__success-title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: "opsz" 96, "SOFT" 70;
}
.la-book__conf-label {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 1rem 0 0;
}
.la-book__conf-id { margin: 0; }
.la-book__conf-id code {
  font-family: ${fonts.mono}; font-weight: 500;
  font-size: clamp(2rem, 4.5vw, 2.8rem);
  color: ${palette.moss}; letter-spacing: 0.04em;
}
.la-book__summary {
  font-family: ${fonts.body}; font-size: 0.98rem;
  color: ${palette.ink}; opacity: 0.82; margin: 0.5rem 0 1.5rem;
}
@media (prefers-reduced-motion: reduce) {
  .la-book__cta { transition: none; }
  .la-book__cta:hover { transform: none; }
}
@media (max-width: 720px) {
  .la-book { padding: 4rem 1.25rem; }
  .la-book__row { grid-template-columns: 1fr; }
  .la-book__row--end { grid-template-columns: 1fr; justify-self: stretch; }
  .la-book__row--end .la-book__cta, .la-book__row--end .la-book__back { width: 100%; text-align: center; }
  .la-book__card { grid-template-columns: 1fr; }
  .la-book__steps { flex-wrap: wrap; gap: 1rem; }
}
`;
