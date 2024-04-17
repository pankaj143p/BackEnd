import {v2 as  cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    _secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)return null
        // uplod file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });
        //file has been uploaded
        console.log("file is uploaded on cloudinary", res.url);
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        // remove the locally saved temparory file as the upload opeation got failed 
        return null
    }
}


cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
{ public_id: "olympic_flag" }, 
function(error, result) {console.log(result); });


export {uploadOnCloudinary};