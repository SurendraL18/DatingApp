import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Celebration-u6tZbu69.js
var import_jsx_runtime = require_jsx_runtime();
var PIECES = Array.from({ length: 60 }, (_, i) => {
	const angle = i / 60 * Math.PI * 2;
	const distance = 140 + i * 37 % 220;
	return {
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance,
		rotate: i * 47 % 360,
		delay: i % 10 * .02,
		emoji: [
			"❤️",
			"✨",
			"💖",
			"🎉",
			"💫",
			"💕"
		][i % 6],
		size: 14 + i % 4 * 7
	};
});
/** Heart + sparkle explosion radiating from the center of its parent. */
function Celebration({ active, loop = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-50 flex items-center justify-center",
		children: PIECES.map((piece, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute",
			style: { fontSize: piece.size },
			initial: {
				opacity: 0,
				x: 0,
				y: 0,
				scale: .2,
				rotate: 0
			},
			animate: {
				opacity: [
					0,
					1,
					1,
					0
				],
				x: piece.x,
				y: [
					0,
					piece.y,
					piece.y + 140
				],
				scale: [
					.2,
					1.1,
					.9
				],
				rotate: piece.rotate
			},
			transition: {
				duration: 1.8,
				delay: piece.delay,
				ease: "easeOut",
				repeat: loop ? Infinity : 0,
				repeatDelay: loop ? .6 : 0
			},
			children: piece.emoji
		}, i))
	}) });
}
//#endregion
export { Celebration as t };
