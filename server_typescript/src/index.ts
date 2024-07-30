import { config as dotenvConfig } from "dotenv"; dotenvConfig();
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.ts";
import userRouter from "./routes/user.route.ts";
import postRouter from "./routes/post.route.ts";
import fileRouter from "./routes/file.route.ts";
import { connectSocket } from "./services/socket.service.ts";
import { createServer } from "http";
import roomRouter from "./routes/room.route.ts";
import chatRouter from "./routes/chat.route.ts";

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
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/files", fileRouter);
app.use("/rooms", roomRouter);
app.use("/chats", chatRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


