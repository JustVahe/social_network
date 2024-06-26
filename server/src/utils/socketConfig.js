const router = require("express").Router();
const { sequelize, Message } = require("../../models/index");
const { Server } = require("socket.io")

const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    });
    
    io.on("connection", (socket) => {
        console.log("User is connected: " + socket.id);

        socket.on("join_room", (data) => {
            socket.join(data.id); 
            socket.emit("receive_approved_room", data);
        })

        socket.on("send_message", async(data) => {  
            socket.to(data.room_id).emit("receive_message", data);  
        })

    });

}

module.exports = connectSocket;