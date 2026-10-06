import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Short branded loading veil on first paint. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDone(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            ❤️
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
