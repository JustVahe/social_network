import { connect } from "socket.io-client";

const socket = connect("http://localhost:8246");

export const getSocket = () => {
    return socket;
}
