const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./connectDB"); // ✅ import

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const programRoutes = require("./ProgramMasterroute");
app.use("/api/programs", programRoutes);

app.get("/", (req, res) => {
  res.send("API RUNNING....");
});

// ✅ Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB(); // ✅ important
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("DB connection failed:", error);
  }
};

startServer();