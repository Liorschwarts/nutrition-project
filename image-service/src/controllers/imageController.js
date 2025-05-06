import { analyzeFoodImage } from "../services/imageAnalysisService.js";

// @desc    Analyze food in an uploaded image
// @route   POST /api/images/analyze
// @access  Public
export const analyzeImage = async (req, res) => {
  try {
    // Check if image file was provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Convert image buffer to base64
    const imageBase64 = req.file.buffer.toString("base64");

    // Analyze the image
    const result = await analyzeFoodImage(imageBase64);

    res.json(result);
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({
      success: false,
      message: "Error analyzing image",
    });
  }
};

// @desc    Analyze food in a base64 encoded image
// @route   POST /api/images/analyze-base64
// @access  Public
export const analyzeBase64Image = async (req, res) => {
  try {
    const { image } = req.body;

    // Check if base64 image was provided
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No base64 image provided",
      });
    }

    // Strip out image data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    // Analyze the image
    const result = await analyzeFoodImage(base64Image);

    res.json(result);
  } catch (error) {
    console.error("Error analyzing base64 image:", error);
    res.status(500).json({
      success: false,
      message: "Error analyzing image",
    });
  }
};
