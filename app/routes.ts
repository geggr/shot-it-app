import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/sign-in.tsx"),
    route("/sign-up", "routes/sign-up.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
    route("/video/*", "routes/video-details.tsx")
] satisfies RouteConfig;
