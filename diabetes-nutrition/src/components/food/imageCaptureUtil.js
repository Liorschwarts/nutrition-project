/**
 * Utility function to capture an image from the device camera
 * @returns {Promise<File>} - Image file
 */
export const captureImageFromCamera = async () => {
  // Request camera access
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  // Create a video element to display the stream
  const video = document.createElement("video");
  video.srcObject = stream;
  video.play();

  // Wait for the video to be loaded
  await new Promise((resolve) => {
    video.onloadedmetadata = resolve;
  });

  // Create a canvas to capture the image
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame to the canvas
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Stop the video stream
  stream.getTracks().forEach((track) => track.stop());

  // Convert the canvas to a data URL
  const dataUrl = canvas.toDataURL("image/jpeg");

  // Convert data URL to blob for upload
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const file = new File([blob], "camera-image.jpg", { type: "image/jpeg" });

  return file;
};
