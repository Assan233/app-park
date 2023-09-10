import Home from "@/views/home/index.vue";
import WebRTC from "@/views/web-rtc/index.vue";
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
        // redirect: "/webRTC/offer",
    },
    {
        path: "/webRTC/:roomType",
        name: "webRTC",
        component: WebRTC,
        meta: { pageName: "webRTC(直播)" },
        // children: [
        //     {
        //         path: "offer",
        //         name: "offer",
        //         component: WebRTC,
        //         meta: { pageName: "主播页" },
        //     },
        //     // {
        //     //     path: "/answer",
        //     //     name: "answer",
        //     //     component: WebRTC,
        //     //     meta: { pageName: "观众页" },
        //     // },
        // ],
    },
];
