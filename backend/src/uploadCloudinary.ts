import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path: path.resolve(__dirname, "../../.env")})


const UPLOAD_PRESET = process.env.UPLOAD_PRESET
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME

if(!UPLOAD_PRESET ||!CLOUDINARY_NAME){
    throw new Error("Missing Cloudinary environment variable")
}


export const uploadCloudinary = async(imageUrl: string): Promise<string>=>{

    const formData = new FormData()

    formData.append("file", imageUrl)
    formData.append("upload_preset", UPLOAD_PRESET)

    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,{
        method: "POST",
        body: formData
    })

    const data = await response.json()
    return data.secure_url
}