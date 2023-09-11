import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "@/const";
import { useWebRTC } from "@/stores";

export function useOffer() {
    const webRTCStore = useWebRTC();

    async function startLive(video: HTMLVideoElement) {
        const socket = io("ws://localhost:7001/rtc");
        webRTCStore.setSocket(socket);

        // 初始化socket连接
        await createRoom();
        // 监听远端媒体协商事件
        listenSDP();

        // 获取直播视频流
        // const mediaStream = await getUserMedia();
        // video.srcObject = mediaStream;

        // TODO: 模拟推流
        setInterval(() => {
            postMedia("video stream");
        }, 1500);
    }

    /** ===== 建立信令服务连接 ====== */
    /**
     * 创建房间
     */
    async function createRoom() {
        webRTCStore.socket.emit(SOCKET_EVENTS.createRoom);
        const roomId = await onCreateRoom();
        webRTCStore.setRoom({ id: roomId });
    }
    /**
     * 创建房间成功后，返回房间ID
     */
    function onCreateRoom(): Promise<number> {
        return new Promise((resolve) => {
            webRTCStore.socket.on(SOCKET_EVENTS.createRoom, (roomId) => {
                console.log(`${SOCKET_EVENTS.createRoom}: ${roomId}`);
                resolve(roomId);
            });
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

    /** ===== 媒体协商 ====== */
    /**
     * 监听媒体协商事件，并及时发送本地SDP
     */
    async function listenSDP() {
        webRTCStore.socket.on(
            SOCKET_EVENTS.receiveOfferSDP,
            async (data: {
                roomId: string;
                offerSDP: RTCSessionDescriptionInit;
            }) => {
                const { roomId, offerSDP } = data;
                const localPC = new RTCPeerConnection();

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

    /** ===== 媒体协商 ====== */

    return {
        startLive,
    };
}
