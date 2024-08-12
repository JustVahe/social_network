import { config as dotenvConfig } from "dotenv"
import { Server } from "socket.io";
import { Server as HttpServer } from "http";
dotenvConfig();

export const connectSocket = (server: HttpServer) => {

    const io = new Server(server, {
        cors: {
            origin: process.env.CORS,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    });

    io.on("connection", (socket) => {
        
        console.log("User is connected: " + socket.id);

        socket.on("join_room", (data) => {
            socket.join(data);
        });

        socket.on("join_chat", (data) => {
            socket.join(data);
        });

        socket.on("send_message", (data) => {  
            socket.to(data.room_id).emit("receive_message", data);  
        });

        socket.on("send_message_to_chat", (data) => {
            console.log("sent")
            socket.to(data.room_id).emit("receive_message", data);  
        });
    });
}