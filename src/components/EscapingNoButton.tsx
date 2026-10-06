import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState, type RefObject } from "react";
import { EMOJI_STORM_AFTER, NO_LABEL, SHRINK_AFTER, TEASES } from "@/lib/question";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface EscapingNoButtonProps {
  /** The area the button is allowed to roam inside. */
  boundsRef: RefObject<HTMLDivElement | null>;
}

const SAFE_DISTANCE = 110;

export function EscapingNoButton({ boundsRef }: EscapingNoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const reduced = usePrefersReducedMotion();

  const flee = useCallback(() => {
    const bounds = boundsRef.current?.getBoundingClientRect();
    const self = buttonRef.current?.getBoundingClientRect();
    if (!bounds || !self) return;

    const maxX = Math.max(bounds.width - self.width, 0);
    const maxY = Math.max(bounds.height - self.height, 0);
    // Current top-left of the button inside its container, minus current offset.
    const baseX = self.left - bounds.left - offset.x;
    const baseY = self.top - bounds.top - offset.y;

    let nextX = offset.x;
    let nextY = offset.y;
    for (let i = 0; i < 12; i += 1) {
      const targetX = Math.random() * maxX;
      const targetY = Math.random() * maxY;
      const candidateX = targetX - baseX;
      const candidateY = targetY - baseY;
      const moved = Math.hypot(candidateX - offset.x, candidateY - offset.y);
      nextX = candidateX;
      nextY = candidateY;
      if (moved > SAFE_DISTANCE) break;
    }

    setOffset({ x: nextX, y: nextY });
    setAttempts((count) => count + 1);
  }, [boundsRef, offset.x, offset.y]);

  const shrunk = attempts >= SHRINK_AFTER;
  const storm = attempts >= EMOJI_STORM_AFTER;
  const tease = TEASES[Math.min(Math.floor(attempts / SHRINK_AFTER), TEASES.length - 1)];

  return (
    <>
      <motion.div
        className="relative inline-block"
        animate={{ x: offset.x, y: offset.y }}
        transition={
          reduced
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 260, damping: 16, mass: 0.6 }
        }
        style={{ zIndex: 20 }}
      >
        <motion.button
          ref={buttonRef}
          type="button"
          aria-label={`${NO_LABEL} — this button keeps running away`}
          onPointerEnter={flee}
          onPointerDown={(event) => {
            event.preventDefault();
            flee();
          }}
          onFocus={flee}
          onClick={flee}
          animate={{
            scale: shrunk ? Math.max(0.45, 1 - (attempts - SHRINK_AFTER) * 0.03) : 1,
            rotate: shrunk ? (attempts % 2 === 0 ? -12 : 14) : 0,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 14 }}
          className="glass-panel cursor-heart inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
        >
          <span aria-hidden>😅</span>
          {NO_LABEL}
        </motion.button>

        <AnimatePresence>
          {shrunk && (
            <motion.span
              role="status"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-foreground"
            >
              {tease}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {storm && (
          <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            {Array.from({ length: 16 }, (_, i) => (
              <motion.span
                key={i}
                className="absolute bottom-0 text-3xl"
                style={{ left: `${(i * 6.4 + 5) % 95}%` }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: "-105vh", opacity: [0, 1, 1, 0], rotate: [0, 25, -20, 0] }}
                transition={{
                  duration: 7 + (i % 4),
                  delay: (i % 8) * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {["😂", "🤣", "😹", "😆"][i % 4]}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
