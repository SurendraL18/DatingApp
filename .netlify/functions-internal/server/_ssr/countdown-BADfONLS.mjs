import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/countdown-BADfONLS.js
var $$splitComponentImporter = () => import("./countdown-DDcjhh0z.mjs");
var TITLE = "Be Ready — Our Date Countdown";
var DESCRIPTION = "The countdown to our date is live: days, hours, minutes and seconds until it's finally time.";
var Route = createFileRoute("/countdown")({
	validateSearch: (search) => ({ at: typeof search["at"] === "string" ? search["at"] : "" }),
	head: () => ({ meta: [
		{ title: TITLE },
		{
			name: "description",
			content: DESCRIPTION
		},
		{
			property: "og:title",
			content: TITLE
		},
		{
			property: "og:description",
			content: DESCRIPTION
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
