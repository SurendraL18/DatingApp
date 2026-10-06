import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { FloatingHearts } from "@/components/FloatingHearts";
import { GlassCard } from "@/components/GlassCard";
import { YesButton } from "@/components/YesButton";
import { EscapingNoButton } from "@/components/EscapingNoButton";
import { Celebration } from "@/components/Celebration";
import { SparkleCursor } from "@/components/SparkleCursor";
import { FloatingControls } from "@/components/FloatingControls";
import { LoadingScreen } from "@/components/LoadingScreen";
import { QUESTION, SUBTITLE } from "@/lib/question";

const TITLE = "Will You Go On A Date With Me?";
const DESCRIPTION =
  "A playful invitation: say yes, pick a date and time, and watch the countdown begin. The no button is not an option.";

export const Route = createFileRoute("/")({
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
  component: AskPage,
});

function AskPage() {
  const navigate = useNavigate();
  const boundsRef = useRef<HTMLDivElement>(null);
  const [celebrating, setCelebrating] = useState(false);

  const handleYes = () => {
    setCelebrating(true);
    window.setTimeout(() => navigate({ to: "/book" }), 1400);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <AuroraBackground />
      <FloatingHearts />
      <SparkleCursor />
      <LoadingScreen />
      <FloatingControls />
      <Celebration active={celebrating} />

      <AnimatePresence>
        {!celebrating && (
          <motion.div
            key="card"
            exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            <GlassCard>
              <div
                ref={boundsRef}
                className="relative flex min-h-[26rem] flex-col items-center justify-center gap-8 text-center"
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xs uppercase tracking-[0.35em] text-muted-foreground"
                >
                  A small question
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 110, damping: 16 }}
                  className="text-gradient text-balance text-4xl font-bold leading-tight sm:text-6xl"
                >
                  {QUESTION}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-md text-sm text-muted-foreground sm:text-base"
                >
                  {SUBTITLE}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 130, damping: 16 }}
                  className="flex flex-wrap items-center justify-center gap-5"
                >
                  <YesButton onYes={handleYes} />
                  <EscapingNoButton boundsRef={boundsRef} />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
