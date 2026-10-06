import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./countdown-BADfONLS.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as SparkleCursor, i as GlassCard, n as FloatingControls, r as FloatingHearts, t as AuroraBackground } from "./GlassCard-QuM67fXG.mjs";
import { i as formatPrettyTime, r as formatPrettyDate } from "./datetime-C0-ChXJj.mjs";
import { t as Celebration } from "./Celebration-u6tZbu69.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/countdown-DDcjhh0z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UNITS = [
	{
		key: "days",
		label: "Days"
	},
	{
		key: "hours",
		label: "Hours"
	},
	{
		key: "minutes",
		label: "Minutes"
	},
	{
		key: "seconds",
		label: "Seconds"
	}
];
function CountdownTimer({ parts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5",
		children: UNITS.map((unit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				delay: .08 * index,
				type: "spring",
				stiffness: 140,
				damping: 16
			},
			className: "glass-panel rounded-3xl px-4 py-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-gradient font-display text-4xl font-bold tabular-nums sm:text-5xl",
				children: String(parts[unit.key]).padStart(2, "0")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground",
				children: unit.label
			})]
		}, unit.key))
	});
}
function diff(target) {
	const ms = target - Date.now();
	if (ms <= 0) return {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		finished: true
	};
	return {
		days: Math.floor(ms / 864e5),
		hours: Math.floor(ms / 36e5 % 24),
		minutes: Math.floor(ms / 6e4 % 60),
		seconds: Math.floor(ms / 1e3 % 60),
		finished: false
	};
}
function useCountdown(target) {
	const [parts, setParts] = (0, import_react.useState)({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		finished: false
	});
	const time = target ? target.getTime() : null;
	(0, import_react.useEffect)(() => {
		if (time === null) return;
		setParts(diff(time));
		const id = window.setInterval(() => setParts(diff(time)), 1e3);
		return () => window.clearInterval(id);
	}, [time]);
	return parts;
}
function CountdownPage() {
	const { at } = Route.useSearch();
	const parsed = at ? new Date(at) : null;
	const target = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
	const parts = useCountdown(target);
	const done = target ? parts.finished : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingHearts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkleCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingControls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celebration, {
				active: done,
				loop: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .96
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .6,
					ease: "easeOut"
				},
				className: "w-full max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center",
					children: !target ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-gradient text-4xl font-bold sm:text-5xl",
							children: "No date picked yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "Start from the beginning and say yes first."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105",
							children: "Take me back"
						})
					] }) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							type: "spring",
							stiffness: 120,
							damping: 14
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-gradient text-4xl font-bold leading-tight sm:text-6xl",
							children: "🎉 It's Finally Date Time ❤️"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-sm text-muted-foreground",
							children: [
								formatPrettyDate(target),
								" · ",
								formatPrettyTime(target)
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-gradient text-4xl font-bold sm:text-6xl",
							children: "❤️ Be Ready ❤️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: [
								formatPrettyDate(target),
								" · ",
								formatPrettyTime(target)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountdownTimer, { parts })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							animate: { opacity: [
								.5,
								1,
								.5
							] },
							transition: {
								duration: 3,
								repeat: Infinity
							},
							className: "mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: "Counting every second"
						})
					] })
				}) })
			})
		]
	});
}
//#endregion
export { CountdownPage as component };
