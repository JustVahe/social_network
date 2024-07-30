import { connect } from "socket.io-client";
import { url } from "../enviromentConfig";

export const getSocket = () => {
    const socket = connect(url);
    return socket;
}
