import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";

export function useAnswer() {
    const webRTCStore = useWebRTC();

    /**
     * 初始化socket连接
     */
    function initSocket() {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 事件订阅
        onConnectRoom();
        onReceiveMedia();
    }

    /**
     * 加入房间
     * @param {number} roomId:number
     */
    function joinRoom(roomId: number) {
        webRTCStore.socket.emit(SOCKET_EVENTS.connectRoom, roomId);
    }

    // socket 事件订阅&推送
    function onConnectRoom() {
        webRTCStore.socket.on(SOCKET_EVENTS.connectRoom, (message: string) => {
            console.log(message);
        });
    }
    function onReceiveMedia() {
        webRTCStore.socket.on(SOCKET_EVENTS.receiveMedia, (media: any) => {
            console.log(`${SOCKET_EVENTS.receiveMedia}: ${media}`);
        });
    }

    return {
        initSocket,
        joinRoom,
    };
}
