import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as AnimatePresence, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as Moon, n as Sun, r as Music, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GlassCard-QuM67fXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePrefersReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(query.matches);
		const onChange = () => setReduced(query.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);
	return reduced;
}
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	return hydrated;
}
function makeSpecks(count, seed) {
	let s = seed;
	const rand = () => {
		s = (s * 9301 + 49297) % 233280;
		return s / 233280;
	};
	return Array.from({ length: count }, () => ({
		left: `${rand() * 100}%`,
		top: `${rand() * 100}%`,
		size: 1 + rand() * 2.5,
		delay: `${rand() * 6}s`,
		duration: `${4 + rand() * 6}s`
	}));
}
var STARS = makeSpecks(70, 7);
/**
* Aurora gradient + twinkling stars + mouse-reactive glow.
*/
function AuroraBackground() {
	const glowRef = (0, import_react.useRef)(null);
	const reduced = usePrefersReducedMotion();
	const hydrated = useHydrated();
	(0, import_react.useEffect)(() => {
		if (reduced) return;
		const onMove = (event) => {
			const el = glowRef.current;
			if (!el) return;
			el.style.transform = `translate3d(${event.clientX - 300}px, ${event.clientY - 300}px, 0)`;
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-40 -left-32 h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-[110px]",
				style: {
					background: "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 65%)",
					animation: reduced ? void 0 : "drift 22s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -right-40 top-10 h-[65vmax] w-[65vmax] rounded-full opacity-55 blur-[120px]",
				style: {
					background: "radial-gradient(circle at 60% 40%, var(--aurora-2), transparent 65%)",
					animation: reduced ? void 0 : "drift 28s ease-in-out infinite reverse"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-[-25%] left-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-45 blur-[130px]",
				style: {
					background: "radial-gradient(circle at 50% 50%, var(--aurora-3), transparent 65%)",
					animation: reduced ? void 0 : "drift 34s ease-in-out infinite"
				}
			}),
			hydrated && !reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: glowRef,
				className: "absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px] transition-transform duration-300 ease-out",
				style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)" }
			}),
			STARS.map((star, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute rounded-full bg-foreground",
				style: {
					left: star.left,
					top: star.top,
					width: star.size,
					height: star.size,
					animation: reduced ? void 0 : `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
					opacity: .3
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.05] mix-blend-overlay",
				style: { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.8'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>\")" }
			})
		]
	});
}
var HEARTS = Array.from({ length: 14 }, (_, i) => ({
	left: `${(i * 7.3 + 4) % 96}%`,
	delay: i % 7 * 1.4,
	duration: 14 + i % 5 * 3,
	size: 12 + i % 4 * 6,
	opacity: .18 + i % 3 * .09
}));
/** Slow floating hearts drifting up the page. */
function FloatingHearts() {
	const reduced = usePrefersReducedMotion();
	const hydrated = useHydrated();
	if (reduced || !hydrated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: HEARTS.map((heart, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute bottom-[-10%] text-primary",
			style: {
				left: heart.left,
				fontSize: heart.size,
				opacity: heart.opacity
			},
			animate: {
				y: ["0vh", "-115vh"],
				x: [
					0,
					24,
					-18,
					0
				],
				rotate: [
					0,
					12,
					-8,
					0
				]
			},
			transition: {
				duration: heart.duration,
				delay: heart.delay,
				repeat: Infinity,
				ease: "linear"
			},
			children: "❤"
		}, i))
	});
}
/** Tiny sparkles trailing the pointer. */
function SparkleCursor() {
	const [sparkles, setSparkles] = (0, import_react.useState)([]);
	const reduced = usePrefersReducedMotion();
	(0, import_react.useEffect)(() => {
		if (reduced) return;
		let id = 0;
		let last = 0;
		const onMove = (event) => {
			const now = performance.now();
			if (now - last < 70) return;
			last = now;
			id += 1;
			const sparkle = {
				id,
				x: event.clientX,
				y: event.clientY
			};
			setSparkles((prev) => [...prev.slice(-14), sparkle]);
			window.setTimeout(() => setSparkles((prev) => prev.filter((item) => item.id !== sparkle.id)), 700);
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, [reduced]);
	if (reduced) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[60]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sparkles.map((sparkle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute size-1.5 rounded-full bg-primary",
			style: {
				left: sparkle.x,
				top: sparkle.y
			},
			initial: {
				opacity: .9,
				scale: 1
			},
			animate: {
				opacity: 0,
				scale: 0,
				y: -18
			},
			exit: { opacity: 0 },
			transition: {
				duration: .7,
				ease: "easeOut"
			}
		}, sparkle.id)) })
	});
}
/** Floating controls: ambient music (muted by default) and theme switch. */
function FloatingControls() {
	const audioRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	const toggleMusic = async () => {
		if (!audioRef.current) {
			const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112191.mp3");
			audio.loop = true;
			audio.volume = .35;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-5 right-5 z-50 flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			type: "button",
			onClick: toggleTheme,
			whileHover: { scale: 1.1 },
			whileTap: { scale: .92 },
			"aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
			className: "glass-panel flex size-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
			children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			type: "button",
			onClick: toggleMusic,
			whileHover: { scale: 1.1 },
			whileTap: { scale: .92 },
			"aria-label": playing ? "Mute background music" : "Play background music",
			className: "glass-panel flex size-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
			children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" })
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Frosted glass surface with an optional subtle 3D tilt on pointer move. */
function GlassCard({ children, className, tilt = true }) {
	const reduced = usePrefersReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useTransform(y, [-.5, .5], [6, -6]), {
		stiffness: 140,
		damping: 18
	});
	const rotateY = useSpring(useTransform(x, [-.5, .5], [-6, 6]), {
		stiffness: 140,
		damping: 18
	});
	const handleMove = (event) => {
		if (!tilt || reduced) return;
		const rect = event.currentTarget.getBoundingClientRect();
		x.set((event.clientX - rect.left) / rect.width - .5);
		y.set((event.clientY - rect.top) / rect.height - .5);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		onPointerMove: handleMove,
		onPointerLeave: reset,
		...tilt && !reduced ? { style: {
			rotateX,
			rotateY,
			transformPerspective: 1200
		} } : {},
		initial: {
			opacity: 0,
			y: 28,
			scale: .97
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 18
		},
		className: cn("glass-panel rounded-4xl p-8 sm:p-12", className),
		children
	});
}
//#endregion
export { SparkleCursor as a, GlassCard as i, FloatingControls as n, cn as o, FloatingHearts as r, usePrefersReducedMotion as s, AuroraBackground as t };
