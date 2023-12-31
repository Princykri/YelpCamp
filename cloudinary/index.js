import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}


  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });



const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Yelpcamp",
        allowedFormats:["jpeg","png","jeg"]
    }
   

})

export {storage,cloudinary}