"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SiteClockContext = createContext<Date | null>(null);

export function SiteClockProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    let interval: number | undefined;
    const now = new Date();
    const delayToNextMinute = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, delayToNextMinute);
    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return <SiteClockContext.Provider value={now}>{children}</SiteClockContext.Provider>;
}

export function useSiteClock() {
  return useContext(SiteClockContext);
}
