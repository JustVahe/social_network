import { config as dotenvConfig } from "dotenv"; dotenvConfig();
import express from "express";
import cors from "cors";
import { connectSocket } from "./services/socket.service.ts";
import { createServer } from "http";
import authRouter from "./routes/auth.route.ts";
import userRouter from "./routes/user.route.ts";
import postRouter from "./routes/post.route.ts";
import fileRouter from "./routes/file.route.ts";
import roomRouter from "./routes/room.route.ts";
import chatRouter from "./routes/chat.route.ts";
import messageRouter from "./routes/message.route.ts";
import friendsRouter from "./routes/friends.route.ts";
import requestRouter from "./routes/request.route.ts";
import commentRouter from "./routes/comment.route.ts";
import replyRouter from "./routes/reply.route.ts";
import reactionRouter from "./routes/reactions.route.ts";
import connectionRouter from "./routes/connection.route.ts";

const app = express();
const PORT = process.env.PORT || 3001;

const server = createServer(app);

connectSocket(server);

app.use(express.json());
app.use(cors({
    origin: process.env.CORS,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: -1
}));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/post", postRouter);
app.use("/files", fileRouter);
app.use("/rooms", roomRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);
app.use("/friends", friendsRouter);
app.use("/requests", requestRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);
app.use("/reactions", reactionRouter);
app.use("/connections", connectionRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


