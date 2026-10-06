import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion } from "motion/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { toast } from "sonner";
import { CalendarHeart, Clock, Loader2 } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { FloatingHearts } from "@/components/FloatingHearts";
import { SparkleCursor } from "@/components/SparkleCursor";
import { FloatingControls } from "@/components/FloatingControls";
import { GlassCard } from "@/components/GlassCard";
import { notifyBooking } from "@/lib/booking.functions";
import {
  TIME_OPTIONS,
  combineDateAndTime,
  formatPrettyDate,
  formatTimeLabel,
  getTimezone,
} from "@/lib/datetime";
import { cn } from "@/lib/utils";

const TITLE = "Pick Our Date — Let's Make It Official";
const DESCRIPTION =
  "Choose the day and the hour for our date, and the countdown starts the moment you confirm.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const navigate = useNavigate();
  const send = useServerFn(notifyBooking);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const ready = Boolean(date && time);

  const confirm = async () => {
    if (!date || !time) return;
    setSubmitting(true);
    const when = combineDateAndTime(date, time);
    try {
      await send({
        data: {
          date: formatPrettyDate(when),
          time: formatTimeLabel(time),
          timezone: getTimezone(),
          browser: navigator.userAgent,
          isoDateTime: when.toISOString(),
        },
      });
      toast.success("It's a date! ❤️");
    } catch {
      toast.success("It's a date! ❤️");
    } finally {
      navigate({ to: "/countdown", search: { at: when.toISOString() } });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <AuroraBackground />
      <FloatingHearts />
      <SparkleCursor />
      <FloatingControls />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <GlassCard tilt={false}>
          <div className="text-center">
            <h1 className="text-gradient text-4xl font-bold sm:text-5xl">
              Let&apos;s Pick Our Date ❤️
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose a day and a time. Everything else is on me.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[auto_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-panel rounded-3xl p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarHeart className="size-4 text-primary" /> Choose a day
              </div>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                className="pointer-events-auto rdp-custom"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-panel flex flex-col rounded-3xl p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="size-4 text-primary" /> Choose a time
              </div>
              <div
                role="radiogroup"
                aria-label="Pick a time"
                className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4"
              >
                {TIME_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={time === option}
                    onClick={() => setTime(option)}
                    className={cn(
                      "cursor-heart rounded-xl border border-glass-border px-2 py-2 text-xs font-medium transition-all hover:scale-105 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      time === option
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatTimeLabel(option)}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-xs text-muted-foreground" aria-live="polite">
                  {date ? formatPrettyDate(date) : "No day selected yet"}
                  {time ? ` · ${formatTimeLabel(time)}` : ""}
                </p>
                <motion.button
                  type="button"
                  disabled={!ready || submitting}
                  onClick={confirm}
                  {...(ready ? { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } } : {})}

                  className="cursor-heart inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, var(--aurora-1), var(--primary) 55%, var(--aurora-2))",
                  }}
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  Confirm our date
                </motion.button>
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </main>
  );
}
