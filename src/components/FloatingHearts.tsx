import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHydrated } from "@/hooks/useHydrated";

const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 4) % 96}%`,
  delay: (i % 7) * 1.4,
  duration: 14 + (i % 5) * 3,
  size: 12 + (i % 4) * 6,
  opacity: 0.18 + (i % 3) * 0.09,
}));

/** Slow floating hearts drifting up the page. */
export function FloatingHearts() {
  const reduced = usePrefersReducedMotion();
  const hydrated = useHydrated();
  if (reduced || !hydrated) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {HEARTS.map((heart, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10%] text-primary"
          style={{ left: heart.left, fontSize: heart.size, opacity: heart.opacity }}
          animate={{ y: ["0vh", "-115vh"], x: [0, 24, -18, 0], rotate: [0, 12, -8, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}
