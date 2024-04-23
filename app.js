// Import the Express module
import express from "express";

// Import the CORS module
import cors from 'cors';

// Import the index routes module
import indexRoutes from './routes/index.js';
import institutionRoutes from "./routes/institution.js";
import userRoutes from "./routes/user.js";
import leaderboardRoutes from "./routes/leaderboard.js";

// Create an Express application
const app = express();

const setXContentTypeOptions = (req, res, next) => {
  res.set("x-content-type-options", "nosniff");
  next();
};

const setXFrameOptions = (req, res, next) => {
  res.set("x-frame-options", "deny");
  next();
};

const setContentSecurityPolicy = (req, res, next) => {
  res.set("content-security-policy", "default-src 'none'");
  next();
};

// Use the CORS module
app.use(cors());
app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests


// Use the routes module
app.use('/', indexRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;