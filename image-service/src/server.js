import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import imageRoutes from "./routes/imageRoutes.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev")); // HTTP request logger
app.use(express.json({ limit: "10mb" })); // Parse JSON request body with increased limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/images", imageRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Image Service is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Image Service running on port ${PORT}`);
});

// For testing purposes
export default app;
