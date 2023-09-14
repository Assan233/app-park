import { defineStore } from "pinia";
import { Socket } from "socket.io-client";

type Room = { id: string };
type WebRTC = {
    room: Room;
    socket: Socket;
};

export const useWebRTC = defineStore("webRTC", {
    state: (): WebRTC => {
        return {
            room: {
                id: '',
            },
            socket: null!,
        };
    },
    actions: {
        setRoom(room: Room) {
            this.room = room;
        },
        setSocket(socket: Socket) {
            this.socket = socket;
        },
    },
});
