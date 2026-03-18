import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer memory storage
export const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Convert buffer to base64 data URI and upload to Cloudinary
export async function imageUploadUtil(file) {
  if (!file || !file.buffer) throw new Error("No file provided");

  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri,);

  return result;
}