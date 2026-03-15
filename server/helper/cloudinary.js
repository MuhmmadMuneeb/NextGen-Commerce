import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KET,
    api_secret: process.env.API_SECRET
});

export const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'auto'
    });
    return result
}
const upload = multer({ storage: storage })

export { imageUploadUtil, upload }