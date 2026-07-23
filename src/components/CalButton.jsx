"use client";
import { useEffect } from "react";

const CAL_LINK = "aifantry/30min";
const CAL_NS = "consultation";

function setupCal() {
  if (window.Cal) {
    // Embed script already loaded - ensure namespace is registered
    if (!window.Cal.ns?.[CAL_NS]) {
      window.Cal("init", CAL_NS, { origin: "https://cal.com" });
      window.Cal.ns[CAL_NS]("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }
    return;
  }

  // Run Cal's inline embed snippet to create the queue + load embed.js
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

  window.Cal("init", CAL_NS, { origin: "https://cal.com" });
  window.Cal.ns[CAL_NS]("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

/**
 * A button that opens a Cal.com scheduling popup when clicked.
 * Loads the Cal embed script once and uses event delegation - safe to render
 * dynamically (e.g. after form submit).
 */
export default function CalButton({ className, style, children }) {
  useEffect(() => {
    setupCal();
    // Track booking completion from the popup as a Schedule conversion
    function onBookingSuccess() {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Schedule");
      }
    }
    // Wait a tick to ensure the Cal namespace is registered before attaching
    const timer = setTimeout(() => {
      if (window.Cal?.ns?.[CAL_NS]) {
        window.Cal.ns[CAL_NS]("on", { action: "bookingSuccessful", callback: onBookingSuccess });
      } else {
        // Fallback: attach on the global Cal instance
        window.Cal?.("on", { action: "bookingSuccessful", callback: onBookingSuccess });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NS}
      data-cal-config='{"layout":"month_view"}'
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
