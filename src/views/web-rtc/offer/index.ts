import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";
import { createPeerConnection } from "../utils";

export function useOffer() {
    const webRTCStore = useWebRTC();
    const localPC = createPeerConnection();

    async function startLive(video: HTMLVideoElement) {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 建立信令服务
        const roomId = await createRoom();
        // 网络协商
        listenCandidate(roomId);
        // 媒体流注入localPC
        await injectMedia(video);
        // 媒体协商
        listenSDP(roomId);
    }

    /** ===== 建立信令服务连接 ====== */
    /**
     * 创建房间
     */
    async function createRoom(): Promise<string> {
        webRTCStore.socket.emit(SOCKET_EVENTS.createRoom);
        const roomId = await onCreateRoom();
        webRTCStore.setRoom({ id: roomId });
        return roomId;
    }
    /**
     * 创建房间成功后，返回房间ID
     */
    function onCreateRoom(): Promise<string> {
        return new Promise((resolve) => {
            webRTCStore.socket.on(SOCKET_EVENTS.createRoom, (roomId) => {
                console.log(`${SOCKET_EVENTS.createRoom}: ${roomId}`);
                resolve(roomId);
            });
        });
    }

    /** ===== 媒体协商 ====== */
    /**
     * 监听媒体协商事件，并及时发送本地SDP
     */
    async function listenSDP(roomId: string) {
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

    /** ===== 网络协商 ====== */
    function listenCandidate(roomId: string) {
        localPC.onicecandidate = ({ candidate }) => {
            if (candidate) {
                webRTCStore.socket.emit(SOCKET_EVENTS.offerCandidate, {
                    roomId,
                    candidate,
                });
            }
        };
    }

    /** ===== 处理媒体流 ====== */
    /**
     * 注入媒体流到 localPC
     */
    async function injectMedia(video: HTMLVideoElement) {
        const mediaStream = await getUserMedia();
        video.srcObject = mediaStream;

        mediaStream
            .getTracks()
            .forEach((track) => localPC.addTrack(track, mediaStream));
    }
    function getUserMedia() {
        const constraints = { video: true, audio: true };
        return navigator.mediaDevices.getDisplayMedia(constraints).catch((err) => {
            console.error(err);
            throw new Error(err);
        });
    }

    return {
        startLive,
    };
}
