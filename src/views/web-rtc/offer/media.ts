function useMedia() {
    
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
}