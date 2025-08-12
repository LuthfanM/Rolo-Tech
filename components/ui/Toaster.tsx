"use client";

import { useEffect, useState } from "react";

export default function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    const onToast = (e: Event) => {
      const { message, duration = 1800 } = (e as CustomEvent).detail || {};
      setMsg(message);
      if (timer) clearTimeout(timer);
      setTimer(setTimeout(() => setMsg(null), duration));
    };
    window.addEventListener("toast", onToast as EventListener);
    return () => window.removeEventListener("toast", onToast as EventListener);
  }, [timer]);

  if (!msg) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-lg bg-black/85 text-white px-4 py-2 text-sm shadow-lg">
        {msg}
      </div>
    </div>
  );
}
