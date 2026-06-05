const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const searchRoutes = require("./routes/searchRoutes");
const chatRoutes = require("./routes/chatRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const codeViewerRoutes =
  require("./routes/codeViewerRoutes");
const flowRoutes =
  require("./routes/flowRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/summary", summaryRoutes);
app.use(
  "/api/flow",
  flowRoutes
);
app.use(
  "/api/code-viewer",
  codeViewerRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Health Check
app.get("/", (req, res) => {
  res.send("EchoBrain Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});