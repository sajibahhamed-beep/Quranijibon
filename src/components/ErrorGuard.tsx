"use client";

import { useEffect } from "react";

export default function ErrorGuard() {
  useEffect(() => {
    const handleRawEventError = (event: Event) => {
      // Suppress unhandled raw Event objects (e.g. from third-party media / iframe embeds)
      if (event && !(event instanceof ErrorEvent) && typeof (event as ErrorEvent).message === "undefined") {
        event.preventDefault();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && !(event.reason instanceof Error)) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleRawEventError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection, true);

    return () => {
      window.removeEventListener("error", handleRawEventError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true);
    };
  }, []);

  return null;
}
