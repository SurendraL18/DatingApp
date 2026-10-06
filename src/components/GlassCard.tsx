import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

/** Frosted glass surface with an optional subtle 3D tilt on pointer move. */
export function GlassCard({ children, className, tilt = true }: GlassCardProps) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 140,
    damping: 18,
  });

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tilt || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      {...(tilt && !reduced
        ? { style: { rotateX, rotateY, transformPerspective: 1200 } }
        : {})}

      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={cn("glass-panel rounded-4xl p-8 sm:p-12", className)}
    >
      {children}
    </motion.div>
  );
}
