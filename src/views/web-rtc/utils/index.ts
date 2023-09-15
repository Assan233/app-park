export const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

export function createPeerConnection(config: any = null): RTCPeerConnection {
    const localPC = new RTCPeerConnection(config);
    return localPC;
}

export function addIceCandidate(
    pc: RTCPeerConnection,
    candidate: RTCIceCandidate
) {
    pc.addIceCandidate(candidate).then(() => {
        console.log("AddIceCandidateSuccess");
    });
}
