import { config as dotenvConfig } from "dotenv"; dotenvConfig();
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


