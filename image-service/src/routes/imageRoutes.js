import express from "express";
import multer from "multer";
import * as imageController from "../controllers/imageController.js";

const router = express.Router();

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Analyze food in an uploaded image
router.post("/analyze", upload.single("image"), imageController.analyzeImage);

// Analyze food in a base64 encoded image
router.post("/analyze-base64", imageController.analyzeBase64Image);

export default router;
