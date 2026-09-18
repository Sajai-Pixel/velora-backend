// utils/cloudinaryUpload.js
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "products",
            resource_type: "image",
        });

        fs.unlinkSync(localFilePath); // remove temp file after successful upload
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove temp file even if upload fails
        return null;
    }
};