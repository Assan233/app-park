import Home from "@/views/Home/index.vue";
import WebRTC from "@/components/WebRTC/index.vue";
import type { Component } from "vue";

type Route = {
    path: string;
    name: string;
    component: Component;
    redirect?: string;
    meta?: Record<string, any>;
    children?: Route[];
};

export const routes: Route[] = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: "/tools",
    },
    {
        path: "/tools",
        name: "tools",
        component: Home,
        redirect: "/tools/webRTC",
        meta: { pageName: "工具" },
        children: [
            {
                path: "webRTC",
                name: "webRTC",
                component: WebRTC,
                meta: { pageName: "WebRTC" },
            },
        ],
    },
];
