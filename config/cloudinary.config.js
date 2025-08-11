import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import streamifier from 'streamifier';

dotenv.config(); // make sure this is called early in your app

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'books' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};