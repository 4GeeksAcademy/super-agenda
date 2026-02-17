import express, {Request,Response} from 'express'
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs/promises'
import { uploadCloudinary } from './uploadCloudinary';



dotenv.config({path: path.resolve(__dirname, "../../.env")})

const app = express()
const PORT = 3001
const CACHE_FILE = path.resolve(__dirname, "../cache.json")


const readCache = async()=>{
    const data = await fs.readFile(CACHE_FILE, "utf-8")
    return JSON.parse(data)
}

const writeCache = async(cache:any)=>{
    await fs.writeFile(CACHE_FILE,JSON.stringify(cache, null, 2))
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


app.use(cors())
app.use(express.json())

app.get("/", (req:Request, res: Response)=>{
res.json({message: "Servidor funciona correctamente"})
})

app.post("/generate-image", async(req:Request, res:Response)=>{

    const {prompt}= req.body

    if(!prompt){
        return res.status(400).json({
            success: false,
            error: "Prompt it's a required field"
        })
    }

    const planePrompt = prompt.toLowerCase()


    const cache = await readCache()

    if(cache[planePrompt]){
        return res.json({
            success: true,
            imageUrl: cache[planePrompt],
            fromCache: true
        })
    }

    try{

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: planePrompt,
            n:1,
            size: "1024x1024"
        })
        
        const imageUrl = response.data?.[0].url
        
        if(!imageUrl) throw new Error("Undefined image url generated")

        const permanentUrl = await uploadCloudinary(imageUrl)


        cache[planePrompt] = permanentUrl
        
        await writeCache(cache)
        
        
        
        return res.json({
            success: true,
            imageUrl: permanentUrl,
            fromCache: false
        })
    }catch(error){
        
        const message= error instanceof OpenAI.APIError ? error.error?.message : "Unknown error"

        return res.status(400).json({
            success:false,
            error: message
        })
    }
    
})




app.listen(PORT,()=>{
    console.log("Servidor corriendo")
})