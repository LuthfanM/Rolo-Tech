"use client";

export function useToast() {
  return {
    show: (message: string, duration = 1800) => {
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { message, duration } })
      );
    },
  };
}
