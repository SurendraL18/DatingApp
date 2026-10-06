import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { o as Heart } from "../_libs/lucide-react.mjs";
import { a as SparkleCursor, i as GlassCard, n as FloatingControls, r as FloatingHearts, s as usePrefersReducedMotion, t as AuroraBackground } from "./GlassCard-QuM67fXG.mjs";
import { t as Celebration } from "./Celebration-u6tZbu69.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CfRhaMN-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TEASES = [
	"Nice try 😂",
	"You can't say no ❤️",
	"It's not going to happen 😌",
	"Try again, slowpoke 🐌"
];
function YesButton({ onYes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		onClick: onYes,
		whileHover: { scale: 1.06 },
		whileTap: { scale: .95 },
		transition: {
			type: "spring",
			stiffness: 320,
			damping: 18
		},
		className: "cursor-heart group relative inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
		style: {
			backgroundImage: "linear-gradient(110deg, var(--aurora-1), var(--primary) 50%, var(--aurora-2))",
			boxShadow: "0 18px 45px -14px color-mix(in oklab, var(--primary) 80%, transparent)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				"aria-hidden": true,
				className: "absolute inset-0 rounded-full",
				style: { boxShadow: "0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)" },
				animate: { boxShadow: ["0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)", "0 0 0 18px color-mix(in oklab, var(--primary) 0%, transparent)"] },
				transition: {
					duration: 2,
					repeat: Infinity,
					ease: "easeOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 fill-current transition-transform group-hover:scale-125" }),
			"Yes"
		]
	});
}
var SAFE_DISTANCE = 110;
function EscapingNoButton({ boundsRef }) {
	const buttonRef = (0, import_react.useRef)(null);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [attempts, setAttempts] = (0, import_react.useState)(0);
	const reduced = usePrefersReducedMotion();
	const flee = (0, import_react.useCallback)(() => {
		const bounds = boundsRef.current?.getBoundingClientRect();
		const self = buttonRef.current?.getBoundingClientRect();
		if (!bounds || !self) return;
		const maxX = Math.max(bounds.width - self.width, 0);
		const maxY = Math.max(bounds.height - self.height, 0);
		const baseX = self.left - bounds.left - offset.x;
		const baseY = self.top - bounds.top - offset.y;
		let nextX = offset.x;
		let nextY = offset.y;
		for (let i = 0; i < 12; i += 1) {
			const targetX = Math.random() * maxX;
			const targetY = Math.random() * maxY;
			const candidateX = targetX - baseX;
			const candidateY = targetY - baseY;
			const moved = Math.hypot(candidateX - offset.x, candidateY - offset.y);
			nextX = candidateX;
			nextY = candidateY;
			if (moved > SAFE_DISTANCE) break;
		}
		setOffset({
			x: nextX,
			y: nextY
		});
		setAttempts((count) => count + 1);
	}, [
		boundsRef,
		offset.x,
		offset.y
	]);
	const shrunk = attempts >= 15;
	const storm = attempts >= 25;
	const tease = TEASES[Math.min(Math.floor(attempts / 15), TEASES.length - 1)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "relative inline-block",
		animate: {
			x: offset.x,
			y: offset.y
		},
		transition: reduced ? { duration: .15 } : {
			type: "spring",
			stiffness: 260,
			damping: 16,
			mass: .6
		},
		style: { zIndex: 20 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			ref: buttonRef,
			type: "button",
			"aria-label": `No — this button keeps running away`,
			onPointerEnter: flee,
			onPointerDown: (event) => {
				event.preventDefault();
				flee();
			},
			onFocus: flee,
			onClick: flee,
			animate: {
				scale: shrunk ? Math.max(.45, 1 - (attempts - 15) * .03) : 1,
				rotate: shrunk ? attempts % 2 === 0 ? -12 : 14 : 0
			},
			transition: {
				type: "spring",
				stiffness: 240,
				damping: 14
			},
			className: "glass-panel cursor-heart inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				children: "😅"
			}), "No"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: shrunk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			role: "status",
			initial: {
				opacity: 0,
				y: 6,
				scale: .9
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .9
			},
			className: "glass-panel absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-foreground",
			children: tease
		}) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: storm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-40 overflow-hidden",
		children: Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute bottom-0 text-3xl",
			style: { left: `${(i * 6.4 + 5) % 95}%` },
			initial: {
				y: 40,
				opacity: 0
			},
			animate: {
				y: "-105vh",
				opacity: [
					0,
					1,
					1,
					0
				],
				rotate: [
					0,
					25,
					-20,
					0
				]
			},
			transition: {
				duration: 7 + i % 4,
				delay: i % 8 * .5,
				repeat: Infinity,
				ease: "linear"
			},
			children: [
				"😂",
				"🤣",
				"😹",
				"😆"
			][i % 4]
		}, i))
	}) })] });
}
/** Short branded loading veil on first paint. */
function LoadingScreen() {
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => setDone(true), 900);
		return () => window.clearTimeout(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-background",
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			scale: 1.04
		},
		transition: {
			duration: .6,
			ease: "easeInOut"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: { scale: [
				1,
				1.25,
				1
			] },
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "easeInOut"
			},
			className: "text-5xl",
			children: "❤️"
		})
	}) });
}
function AskPage() {
	const navigate = useNavigate();
	const boundsRef = (0, import_react.useRef)(null);
	const [celebrating, setCelebrating] = (0, import_react.useState)(false);
	const handleYes = () => {
		setCelebrating(true);
		window.setTimeout(() => navigate({ to: "/book" }), 1400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingHearts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkleCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingControls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celebration, { active: celebrating }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !celebrating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				exit: {
					opacity: 0,
					scale: .94,
					filter: "blur(8px)"
				},
				transition: {
					duration: .6,
					ease: "easeInOut"
				},
				className: "w-full max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: boundsRef,
					className: "relative flex min-h-[26rem] flex-col items-center justify-center gap-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .15 },
							className: "text-xs uppercase tracking-[0.35em] text-muted-foreground",
							children: "A small question"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: 18
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .25,
								type: "spring",
								stiffness: 110,
								damping: 16
							},
							className: "text-gradient text-balance text-4xl font-bold leading-tight sm:text-6xl",
							children: "Will you go on a date with me?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .4 },
							className: "max-w-md text-sm text-muted-foreground sm:text-base",
							children: "One question. Two buttons. Only one of them works."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .5,
								type: "spring",
								stiffness: 130,
								damping: 16
							},
							className: "flex flex-wrap items-center justify-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesButton, { onYes: handleYes }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EscapingNoButton, { boundsRef })]
						})
					]
				}) })
			}, "card") })
		]
	});
}
//#endregion
export { AskPage as component };
