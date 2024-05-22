const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// auth route

app.use("/auth", require("./routes/auth"));

app.listen( PORT ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

