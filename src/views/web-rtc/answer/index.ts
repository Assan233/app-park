import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";
import { createPeerConnection } from "../utils";

export function useAnswer() {
    const webRTCStore = useWebRTC();
    const localPC = createPeerConnection();

    /**
     * 初始化socket连接
     */
    async function startWatchLive(roomId: string) {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 加入房间
        await joinRoom(roomId);
        // 媒体协商
        await listenSDP();
        // 接收媒体流
        onReceiveMedia();
    }

    /** ===== 建立信令服务连接 ====== */
    /**
     * 加入房间
     * @param {number} roomId:number
     */
    async function joinRoom(roomId: string) {
        webRTCStore.socket.emit(SOCKET_EVENTS.connectRoom, roomId);
        await onConnectRoom();
    }

    // socket 事件订阅&推送
    /**
     * 已加入房间
     */
    function onConnectRoom(): Promise<null> {
        return new Promise((resolve) => {
            webRTCStore.socket.on(
                SOCKET_EVENTS.connectRoom,
                (message: string) => {
                    console.log(message);
                    resolve(null);
                }
            );
        });
    }
    function onReceiveMedia() {
        webRTCStore.socket.on(SOCKET_EVENTS.receiveMedia, (media: any) => {
            console.log(`${SOCKET_EVENTS.receiveMedia}: ${media}`);
        });
    }

    /** ===== 媒体协商 ====== */
    /**
     * 处理媒体协商
     */
    async function listenSDP() {
        webRTCStore.socket.on(
            SOCKET_EVENTS.receiveOfferSDP,
            async (data: {
                roomId: string;
                offerSDP: RTCSessionDescriptionInit;
            }) => {
                const { roomId, offerSDP } = data;
                // console.log(roomId, offerSDP);
                /**
                 * TODO: createAnswer是有时序的：
                 * createAnswer之前必须 setRemoteDescription
                 */
                // 设置 远端SDP 到 localPC
                await localPC.setRemoteDescription(offerSDP);
                // 保存为本地SDP
                const answerSDP = await localPC.createAnswer();
                await localPC.setLocalDescription(answerSDP);
                // 通过信令服务器将localSDP发送到对端
                postAnswerSDP(roomId, answerSDP);
            }
        );
    }
    function postAnswerSDP(
        roomId: string,
        answerSDP: RTCSessionDescriptionInit
    ) {
        webRTCStore.socket.emit(SOCKET_EVENTS.postAnswerSDP, {
            roomId,
            answerSDP,
        });
    }



    return {
        startWatchLive,
    };
}
