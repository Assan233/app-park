/**
 * socket
 */
export const SOCKET_EVENTS = {
    createRoom: "createRoom",
    connectRoom: "connectRoom",
    // 媒体事件
    postMedia: "postMedia",
    receiveMedia: "receiveMedia",

    // 媒体协商事件。 SDP: 支持的媒体描述信息
    postOfferSDP: "postOfferSDP" /** 发送 发起者SDP */,
    receiveOfferSDP: "receiveOfferSDP" /** 接收 发起者SDP */,
    postAnswerSDP: "postAnswerSDP" /** 发送应答者SDP */,
    receiveAnswerSDP: "receiveAnswerSDP" /** 接收 应答者SDP */,
};
