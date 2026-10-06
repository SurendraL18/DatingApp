import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { YES_LABEL } from "@/lib/question";

interface YesButtonProps {
  onYes: () => void;
}

export function YesButton({ onYes }: YesButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onYes}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="cursor-heart group relative inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
      style={{
        backgroundImage:
          "linear-gradient(110deg, var(--aurora-1), var(--primary) 50%, var(--aurora-2))",
        boxShadow:
          "0 18px 45px -14px color-mix(in oklab, var(--primary) 80%, transparent)",
      }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)" }}
        animate={{
          boxShadow: [
            "0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)",
            "0 0 0 18px color-mix(in oklab, var(--primary) 0%, transparent)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <Heart className="size-5 fill-current transition-transform group-hover:scale-125" />
      {YES_LABEL}
    </motion.button>
  );
}
