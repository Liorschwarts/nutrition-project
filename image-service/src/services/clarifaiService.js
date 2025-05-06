import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

// Initialize Clarifai client
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_API_KEY}`);

/**
 * Identify food from image using Clarifai API
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<Array>} - Array of identified food concepts
 */
export const identifyFoodFromImage = async (imageBase64) => {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        // Use Clarifai's food model
        model_id: "food-item-recognition",
        inputs: [{ data: { image: { base64: imageBase64 } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          return reject(`Error calling Clarifai API: ${err}`);
        }

        if (response.status.code !== 10000) {
          return reject(`Clarifai API error: ${response.status.description}`);
        }

        // Get the identified concepts (foods)
        const concepts = response.outputs[0].data.concepts;
        resolve(concepts);
      }
    );
  });
};
