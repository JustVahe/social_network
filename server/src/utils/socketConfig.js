const { Server } = require("socket.io")

const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CORS,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    });
    
    io.on("connection", (socket) => {

        console.log("User is connected: " + socket.id);

        socket.on("join_room", (data) => {
            socket.join(data.id); 
            socket.emit("receive_approved_room", data);
        });

        socket.on("join_chat", (data) => {
            socket.join(data.id); 
            console.log("User Joined");
            socket.emit("receive_approved_chat", data);
        });

        socket.on("send_message", async(data) => {  
            socket.to(data.room_id).emit("receive_message", data);  
        });

        socket.on("send_message_to_chat", async(data) => {  
            socket.to(data.room_id).emit("receive_message", data);  
        });

    });

}

module.exports = connectSocket;