import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";

export function useMedia() {
    const webRTCStore = useWebRTC();

    async function injectMedia(video: HTMLVideoElement) {
        // 初始化socket连接
        initSocket();
        webRTCStore.socket.emit(SOCKET_EVENTS.createRoom);

        // const mediaStream = await getUserMedia();
        // video.srcObject = mediaStream;
    }

     /**
     * 初始化socket连接
     */
    function initSocket() {
        const socket = io("ws://localhost:7001/rtc")
        webRTCStore.setSocket(socket)

        // 事件订阅
        webRTCStore.socket.on(SOCKET_EVENTS.createRoom, (id) => {
            webRTCStore.setRoom({ id });
            console.log(id); 
        });
        webRTCStore.socket.on(SOCKET_EVENTS.connectRoom, (message) => {
            console.log(SOCKET_EVENTS.connectRoom, message);
        });
    }
   

    /**
     * 获取投屏媒体流
     */
    function getUserMedia() {
        const constraints = { video: true, audio: true };
        return navigator.mediaDevices
            .getDisplayMedia(constraints)
            .catch((err) => {
                console.error(err);
                throw new Error(err);
            });
    }

    return {
        injectMedia,
    };
}
