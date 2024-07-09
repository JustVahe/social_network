import { connect } from "socket.io-client";
import { url } from "../enviromentConfig";

const socket = connect(url);

export const getSocket = () => {
    return socket;
}
