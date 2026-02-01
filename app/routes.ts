import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("creator/:id", "routes/creator.$id.tsx"),
    route("edit/:id", "routes/edit.$id.tsx"),
    route("add", "routes/add.tsx"),
] satisfies RouteConfig;
