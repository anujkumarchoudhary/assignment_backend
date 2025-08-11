import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Make sure env vars are loaded

class UploadToCloudinary {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        this.cloudinary = cloudinary;
    }

    async upload(filePath, folder = "books") {
        try {
            const result = await this.cloudinary.uploader.upload(filePath, {
                folder, // Optional: Store in a folder
                resource_type: "auto"
            });
            return result;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
    }
}

export default UploadToCloudinary;
