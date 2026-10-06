import { motion } from "motion/react";
import type { CountdownParts } from "@/hooks/useCountdown";

const UNITS: { key: keyof Omit<CountdownParts, "finished">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function CountdownTimer({ parts }: { parts: CountdownParts }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {UNITS.map((unit, index) => (
        <motion.div
          key={unit.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, type: "spring", stiffness: 140, damping: 16 }}
          className="glass-panel rounded-3xl px-4 py-6 text-center"
        >
          <div className="text-gradient font-display text-4xl font-bold tabular-nums sm:text-5xl">
            {String(parts[unit.key]).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
