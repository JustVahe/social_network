const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const connectSocket = require("./utils/socketConfig");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

connectSocket(server);

app.use(express.json());
app.use(cors({
    origin: process.env.CORS,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'authorization', 'Content-Type', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: -1
}));

const PORT = process.env.PORT || 3001;

// auth route

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/friends", require("./routes/friends"));
app.use("/replies", require("./routes/replies"));
app.use("/files", require("./routes/files"));
app.use("/requests", require("./routes/requests"));
app.use("/messages", require("./routes/messages"));
app.use("/rooms", require("./routes/rooms"));
app.use("/chats", require("./routes/chats"));
app.use("/connections", require("./routes/connections"));
app.use("/reactions", require("./routes/reactions"));


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
