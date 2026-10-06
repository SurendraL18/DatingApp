//#region node_modules/.nitro/vite/services/ssr/assets/datetime-C0-ChXJj.js
function combineDateAndTime(date, time) {
	const [hours = "0", minutes = "0"] = time.split(":");
	const result = new Date(date);
	result.setHours(Number(hours), Number(minutes), 0, 0);
	return result;
}
function formatPrettyDate(date) {
	return date.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function formatPrettyTime(date) {
	return date.toLocaleTimeString(void 0, {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function getTimezone() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return "Unknown";
	}
}
var TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
	return `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`;
});
function formatTimeLabel(value) {
	const [h = "0", m = "00"] = value.split(":");
	const hour = Number(h);
	const suffix = hour < 12 ? "AM" : "PM";
	return `${hour % 12 === 0 ? 12 : hour % 12}:${m} ${suffix}`;
}
//#endregion
export { formatTimeLabel as a, formatPrettyTime as i, combineDateAndTime as n, getTimezone as o, formatPrettyDate as r, TIME_OPTIONS as t };
