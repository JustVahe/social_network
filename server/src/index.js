const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// auth route

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/friends", require("./routes/friends"));
app.use("/replies", require("./routes/replies"));



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
