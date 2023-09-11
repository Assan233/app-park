import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";

export function useAnswer() {
    const webRTCStore = useWebRTC();

    /**
     * 初始化socket连接
     */
    async function startWatchLive(roomId: string) {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 加入房间
        await joinRoom(roomId);
        // 媒体协商
        await listenSDP(roomId);
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
    async function listenSDP(roomId: string) {
        const localPC = new RTCPeerConnection();
        let offerSDP = await localPC.createOffer();

        // 保存为本地SDP
        await localPC.setLocalDescription(offerSDP);
        // 通过信令服务器将offerSDP发送到对端
        postOfferSDP(roomId, offerSDP);
        const answerSDP = await receiveAnswerSDP();
        // 设置 远端SDP 到 localPC
        await localPC.setRemoteDescription(answerSDP);
    }
    function postOfferSDP(roomId: string, offerSDP: RTCSessionDescriptionInit) {
        webRTCStore.socket.emit(SOCKET_EVENTS.postOfferSDP, {
            roomId,
            offerSDP,
        });
    }
    /**
     * 接收SDP
     */
    function receiveAnswerSDP(): Promise<RTCSessionDescriptionInit> {
        return new Promise((resolve) => {
            webRTCStore.socket.on(
                SOCKET_EVENTS.receiveAnswerSDP,
                (data: {
                    roomId: string;
                    answerSDP: RTCSessionDescriptionInit;
                }) => {

                    resolve(data.answerSDP);
                    console.log(`receiveAnswerSDP: ${data.answerSDP}`);
                }
            );
        });
    }

    return {
        startWatchLive,
    };
}
