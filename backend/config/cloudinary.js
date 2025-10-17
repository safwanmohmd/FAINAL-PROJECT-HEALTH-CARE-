import {v2 as cloudinary} from 'cloudinary'
import multer from "multer"
import { configDotenv } from 'dotenv';
configDotenv()
import {CloudinaryStorage} from "multer-storage-cloudinary"

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api,
  api_secret: process.env.cloudinary_secret,
});

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"profile",
        allowed_formats:["jpg","png","jpeg"]
    }
})

export const upload = multer({storage})


