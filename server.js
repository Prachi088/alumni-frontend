const express = require("express");
const path = require("path");

const app = express();

// Debug: catch hidden crashes
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT ERROR:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});

// Test route (to verify server is alive)
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// Serve React build files
app.use(express.static(path.join(__dirname, "build")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = 3000;

// Force IPv4 (important for your case)
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});