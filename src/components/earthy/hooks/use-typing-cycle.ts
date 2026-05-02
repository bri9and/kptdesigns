"use client";

import { useEffect, useRef } from "react";

export function useTypingCycle(
  phrases: string[],
  opts: {
    typeMs?: number;
    eraseMs?: number;
    pauseMs?: number;
    startDelayMs?: number;
  } = {}
) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { typeMs = 55, eraseMs = 30, pauseMs = 2200, startDelayMs = 2000 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let idx = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let active = true;

    const onFocus = () => {
      active = false;
      if (timer) clearInterval(timer);
      if (timeout) clearTimeout(timeout);
      el.value = "";
    };
    el.addEventListener("focus", onFocus);

    const typePhrase = (text: string, done: () => void) => {
      let i = 0;
      el.value = "";
      timer = setInterval(() => {
        if (!active) return;
        if (i < text.length) {
          el.value += text[i++];
        } else {
          if (timer) clearInterval(timer);
          timeout = setTimeout(done, pauseMs);
        }
      }, typeMs);
    };

    const erasePhrase = (done: () => void) => {
      let i = el.value.length;
      const text = el.value;
      timer = setInterval(() => {
        if (!active) return;
        if (i > 0) {
          el.value = text.substring(0, --i);
        } else {
          if (timer) clearInterval(timer);
          timeout = setTimeout(done, 400);
        }
      }, eraseMs);
    };

    const cycle = () => {
      if (!active) return;
      typePhrase(phrases[idx], () => {
        erasePhrase(() => {
          idx = (idx + 1) % phrases.length;
          cycle();
        });
      });
    };

    timeout = setTimeout(cycle, startDelayMs);

    return () => {
      active = false;
      el.removeEventListener("focus", onFocus);
      if (timer) clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [phrases, typeMs, eraseMs, pauseMs, startDelayMs]);

  return ref;
}
