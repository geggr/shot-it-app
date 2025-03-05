import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/sign-in.tsx"),
    route("/sign-up", "routes/sign-up.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
    route("/video/:videoId", "routes/video-details.tsx"),
    route("/emails", "routes/email.tsx"),
] satisfies RouteConfig;
