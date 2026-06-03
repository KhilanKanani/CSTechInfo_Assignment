const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = require("./config/ConnectDB");
const path = require("path");

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const compression = require("compression");
app.use(compression());

const PORT = process.env.PORT;
app.use(express.json());

const cors = require("cors");
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/agents", require("./routes/AgentRoutes"));
app.use("/api/upload", require("./routes/UploadRoutes"));
 
app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server running on port ${PORT}`);
});