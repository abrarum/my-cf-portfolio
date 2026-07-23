"use client";
import { useEffect, useId } from "react";

const CAL_LINK = "aifantry/30min";

/**
 * Renders the Cal.com booking widget inline (embedded directly on the page).
 * Safe to mount after a form submission - uses the default Cal namespace.
 */
export default function CalInline({ className, style }) {
  const reactId = useId();
  // useId returns strings like ":r0:" - strip colons for a valid CSS id
  const elementId = `cal-inline-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the embed script hasn't started loading yet, run the Cal snippet
    if (!window.Cal || !window.Cal.loaded) {
      (function (C, A, L) {
        let p = (a, ar) => a.q.push(ar);
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, "https://app.cal.com/embed/embed.js", "init");
    }

    // Queue the inline mount command - Cal processes it once embed.js is ready
    window.Cal("inline", {
      elementOrSelector: `#${elementId}`,
      calLink: CAL_LINK,
      layout: "month_view",
    });
    window.Cal("ui", { theme: "light", hideEventTypeDetails: false });

    // Track Cal.com booking completion as a conversion
    function onBookingSuccess() {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Schedule");
      }
    }
    window.addEventListener("cal:booking-successful", onBookingSuccess);
    return () => window.removeEventListener("cal:booking-successful", onBookingSuccess);
  }, [elementId]);

  return (
    <div
      id={elementId}
      className={className}
      style={{ minHeight: 300, ...style }}
    />
  );
}
