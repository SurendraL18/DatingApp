import { AnimatePresence, motion } from "motion/react";

const PIECES = Array.from({ length: 60 }, (_, i) => {
  const angle = (i / 60) * Math.PI * 2;
  const distance = 140 + ((i * 37) % 220);
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: (i * 47) % 360,
    delay: (i % 10) * 0.02,
    emoji: ["❤️", "✨", "💖", "🎉", "💫", "💕"][i % 6],
    size: 14 + (i % 4) * 7,
  };
});

interface CelebrationProps {
  active: boolean;
  /** Repeat forever (used on the countdown "it's time" state). */
  loop?: boolean;
}

/** Heart + sparkle explosion radiating from the center of its parent. */
export function Celebration({ active, loop = false }: CelebrationProps) {
  return (
    <AnimatePresence>
      {active && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        >
          {PIECES.map((piece, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ fontSize: piece.size }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: piece.x,
                y: [0, piece.y, piece.y + 140],
                scale: [0.2, 1.1, 0.9],
                rotate: piece.rotate,
              }}
              transition={{
                duration: 1.8,
                delay: piece.delay,
                ease: "easeOut",
                repeat: loop ? Infinity : 0,
                repeatDelay: loop ? 0.6 : 0,
              }}
            >
              {piece.emoji}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
