import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";

export function useOffer() {
    const webRTCStore = useWebRTC();

    async function startLive(video: HTMLVideoElement) {
        // 初始化socket连接
        initSocket();
        webRTCStore.socket.emit(SOCKET_EVENTS.createRoom);

        // 获取直播视频流
        // const mediaStream = await getUserMedia();
        // video.srcObject = mediaStream;

        // TODO: 模拟推流
        setInterval(() => {
            postMedia("video stream");
        }, 1500);
    }

    /**
     * 初始化socket连接
     */
    function initSocket() {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 事件订阅
        onCreateRoom();
    }

    // socket 事件订阅&推送
    /**
     * 创建房间成功后，返回房间ID
     */
    function onCreateRoom() {
        webRTCStore.socket.on(SOCKET_EVENTS.createRoom, (id) => {
            webRTCStore.setRoom({ id });
            console.log(`${SOCKET_EVENTS.createRoom}: ${id}`);
        });
    }
    /**
     * 推送媒体流
     * @param {string} media:any
     */
    function postMedia(media: any) {
        webRTCStore.socket.emit(SOCKET_EVENTS.postMedia, {
            roomId: webRTCStore.room.id,
            media,
        });
    }

    return {
        startLive,
    };
}
