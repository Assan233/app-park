export const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

export function createPeerConnection(config: any = null): RTCPeerConnection {
    const localPC = new RTCPeerConnection(config);
    localPC.onicecandidate = (event) => {
        console.log("icecandidate: ", event);
    };
    localPC.ontrack = (event: RTCTrackEvent) => {
        console.log("ontrack media: ", event);
    };

    return localPC;
}
