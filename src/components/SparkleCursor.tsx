import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

/** Tiny sparkles trailing the pointer. */
export function SparkleCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let id = 0;
    let last = 0;
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      id += 1;
      const sparkle = { id, x: event.clientX, y: event.clientY };
      setSparkles((prev) => [...prev.slice(-14), sparkle]);
      window.setTimeout(
        () => setSparkles((prev) => prev.filter((item) => item.id !== sparkle.id)),
        700,
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute size-1.5 rounded-full bg-primary"
            style={{ left: sparkle.x, top: sparkle.y }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: -18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
