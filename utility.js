const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadVideoToCloudinary = async (videoPath) => {
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      upload_preset: "audiogramOutput",
      resource_type: "video",
    });

    console.log("Video uploaded successfully:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

module.exports = {
  uploadVideoToCloudinary,
};
