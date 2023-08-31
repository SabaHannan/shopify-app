// Import necessary libraries
const express = require("express");
import serveStatic from "serve-static";
import path from "path";
import frontendApp from "./web/index.js"; // Import the frontend Express app
import backendApp from "./backend/dist/server.js"; // Import the backend Express app (transcompiled)

const app = express();

// Serve frontend files (adjust the paths as needed)
app.use("/", frontendApp);

// Serve backend GraphQL API
app.use("/api", backendApp);

// Serve static files (if needed)
app.use("/static", serveStatic(path.join(__dirname, "static")));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
