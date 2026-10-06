import { o as __toESM } from "../_runtime.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-uUuap26b.mjs";
import { O as isRedirect, _ as useNavigate, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import "./router-DLiZ5iQR.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as LoaderCircle, c as CalendarHeart, s as Clock } from "../_libs/lucide-react.mjs";
import { a as SparkleCursor, i as GlassCard, n as FloatingControls, o as cn, r as FloatingHearts, t as AuroraBackground } from "./GlassCard-QuM67fXG.mjs";
import { a as formatTimeLabel, n as combineDateAndTime, o as getTimezone, r as formatPrettyDate, t as TIME_OPTIONS } from "./datetime-C0-ChXJj.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-CBAK5cvH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var bookingSchema = objectType({
	date: stringType().min(1).max(80),
	time: stringType().min(1).max(40),
	timezone: stringType().min(1).max(80),
	browser: stringType().min(1).max(300),
	isoDateTime: stringType().min(1).max(60),
	userEmail: stringType().optional()
});
/**
* Emails the date and time confirmation directly via Gmail SMTP (or Resend API).
*/
var notifyBooking = createServerFn({ method: "POST" }).validator((data) => bookingSchema.parse(data)).handler(createSsrRpc("a6440baa0de4b59e656496a9ba84cd6245ddda76ea43436d801c58437acde2ff"));
function BookPage() {
	const navigate = useNavigate();
	const send = useServerFn(notifyBooking);
	const [date, setDate] = (0, import_react.useState)(void 0);
	const [time, setTime] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const ready = Boolean(date && time);
	const confirm = async () => {
		if (!date || !time) return;
		setSubmitting(true);
		const when = combineDateAndTime(date, time);
		try {
			await send({ data: {
				date: formatPrettyDate(when),
				time: formatTimeLabel(time),
				timezone: getTimezone(),
				browser: navigator.userAgent,
				isoDateTime: when.toISOString()
			} });
			toast.success("It's a date! ❤️");
		} catch {
			toast.success("It's a date! ❤️");
		} finally {
			navigate({
				to: "/countdown",
				search: { at: when.toISOString() }
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingHearts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkleCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingControls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					ease: "easeOut"
				},
				className: "w-full max-w-4xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					tilt: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-gradient text-4xl font-bold sm:text-5xl",
							children: "Let's Pick Our Date ❤️"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Choose a day and a time. Everything else is on me."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-8 lg:grid-cols-[auto_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -18
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .15 },
							className: "glass-panel rounded-3xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-2 text-sm font-medium text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarHeart, { className: "size-4 text-primary" }), " Choose a day"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
								mode: "single",
								selected: date,
								onSelect: setDate,
								disabled: { before: /* @__PURE__ */ new Date() },
								className: "pointer-events-auto rdp-custom"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 18
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .25 },
							className: "glass-panel flex flex-col rounded-3xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center gap-2 text-sm font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-primary" }), " Choose a time"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									role: "radiogroup",
									"aria-label": "Pick a time",
									className: "grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4",
									children: TIME_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": time === option,
										onClick: () => setTime(option),
										className: cn("cursor-heart rounded-xl border border-glass-border px-2 py-2 text-xs font-medium transition-all hover:scale-105 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", time === option ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"),
										children: formatTimeLabel(option)
									}, option))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										"aria-live": "polite",
										children: [date ? formatPrettyDate(date) : "No day selected yet", time ? ` · ${formatTimeLabel(time)}` : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										type: "button",
										disabled: !ready || submitting,
										onClick: confirm,
										...ready ? {
											whileHover: { scale: 1.03 },
											whileTap: { scale: .97 }
										} : {},
										className: "cursor-heart inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
										style: { backgroundImage: "linear-gradient(110deg, var(--aurora-1), var(--primary) 55%, var(--aurora-2))" },
										children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Confirm our date"]
									})]
								})
							]
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { BookPage as component };
