import { PlaySquareOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import { MenuProps } from "ant-design-vue";

export const MenuData: MenuProps["items"] = [
    {
        key: "webRTC",
        label: "webRTC(直播)",
        title: "webRTC(直播)",
        icon: () => h(PlaySquareOutlined),
        children: [
            {
                key: "offer",
                label: "主播页",
                title: "主播页",
            },
            {
                key: "answer",
                label: "观众页",
                title: "观众页",
            },
        ],
    },
];
