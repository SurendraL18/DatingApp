import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Music, VolumeX, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

/** Floating controls: ambient music (muted by default) and theme switch. */
export function FloatingControls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3",
      );
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
        toast("Ambience on ✨");
      }
    } catch {
      toast.error("Your browser blocked audio playback.");
    }
  };

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        className="glass-panel flex size-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
      >
        {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </motion.button>
      <motion.button
        type="button"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="glass-panel flex size-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
      >
        {playing ? <Music className="size-5" /> : <VolumeX className="size-5" />}
      </motion.button>
    </div>
  );
}
