require("dotenv").config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const matchRoutes = require("./routes/matchRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/match", matchRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Tic Tac Toe Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});