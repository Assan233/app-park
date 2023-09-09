import Home from "@/views/Home/index.vue";
import WebRTC from "@/components/WebRTC/index.vue";

export const routes = [
    {
        path: "/",
        component: Home,
        redirect: '/webRTC',
        children: [
            {
                path: "webRTC",
                component: WebRTC,
            },
        ],
    },
];
