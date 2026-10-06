import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHydrated } from "@/hooks/useHydrated";

interface Speck {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
}

function makeSpecks(count: number, seed: number): Speck[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    left: `${rand() * 100}%`,
    top: `${rand() * 100}%`,
    size: 1 + rand() * 2.5,
    delay: `${rand() * 6}s`,
    duration: `${4 + rand() * 6}s`,
  }));
}

const STARS = makeSpecks(70, 7);

/**
 * Aurora gradient + twinkling stars + mouse-reactive glow.
 */
export function AuroraBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      const el = glowRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${event.clientX - 300}px, ${event.clientY - 300}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div
        className="absolute -top-40 -left-32 h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 65%)",
          animation: reduced ? undefined : "drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 top-10 h-[65vmax] w-[65vmax] rounded-full opacity-55 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, var(--aurora-2), transparent 65%)",
          animation: reduced ? undefined : "drift 28s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-45 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--aurora-3), transparent 65%)",
          animation: reduced ? undefined : "drift 34s ease-in-out infinite",
        }}
      />

      {hydrated && !reduced && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px] transition-transform duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
          }}
        />
      )}

      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: reduced ? undefined : `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            opacity: 0.3,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.8'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
