export function useMedia() {
    async function injectMedia(video: HTMLVideoElement) {
        const mediaStream = await getUserMedia();
        video.srcObject = mediaStream
    }

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
        injectMedia
    }
}
