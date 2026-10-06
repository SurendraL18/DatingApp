import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { FloatingHearts } from "@/components/FloatingHearts";
import { SparkleCursor } from "@/components/SparkleCursor";
import { FloatingControls } from "@/components/FloatingControls";
import { GlassCard } from "@/components/GlassCard";
import { Celebration } from "@/components/Celebration";
import { CountdownTimer } from "@/components/CountdownTimer";
import { useCountdown } from "@/hooks/useCountdown";
import { formatPrettyDate, formatPrettyTime } from "@/lib/datetime";

const TITLE = "Be Ready — Our Date Countdown";
const DESCRIPTION =
  "The countdown to our date is live: days, hours, minutes and seconds until it's finally time.";

export const Route = createFileRoute("/countdown")({
  validateSearch: (search: Record<string, unknown>) => ({
    at: typeof search["at"] === "string" ? search["at"] : "",
  }),
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
  component: CountdownPage,
});

function CountdownPage() {
  const { at } = Route.useSearch();
  const parsed = at ? new Date(at) : null;
  const target = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
  const parts = useCountdown(target);
  const done = target ? parts.finished : false;

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <AuroraBackground />
      <FloatingHearts />
      <SparkleCursor />
      <FloatingControls />
      <Celebration active={done} loop />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <GlassCard>
          <div className="text-center">
            {!target ? (
              <>
                <h1 className="text-gradient text-4xl font-bold sm:text-5xl">
                  No date picked yet
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                  Start from the beginning and say yes first.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Take me back
                </Link>
              </>
            ) : done ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <h1 className="text-gradient text-4xl font-bold leading-tight sm:text-6xl">
                  🎉 It&apos;s Finally Date Time ❤️
                </h1>
                <p className="mt-5 text-sm text-muted-foreground">
                  {formatPrettyDate(target)} · {formatPrettyTime(target)}
                </p>
              </motion.div>
            ) : (
              <>
                <h1 className="text-gradient text-4xl font-bold sm:text-6xl">
                  ❤️ Be Ready ❤️
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                  {formatPrettyDate(target)} · {formatPrettyTime(target)}
                </p>
                <div className="mt-10">
                  <CountdownTimer parts={parts} />
                </div>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Counting every second
                </motion.p>
              </>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </main>
  );
}
