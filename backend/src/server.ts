import express, {Request,Response} from 'express'
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs/promises'

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

    const cache = await readCache()

    if(cache[prompt]){
        return res.json({
            success: true,
            imageUrl: cache[prompt],
            fromCache: true
        })
    }

    try{

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n:1,
            size: "1024x1024"
        })
        
        const imageUrl = response.data?.[0].url
        
        cache[prompt] = imageUrl
        
        await writeCache(cache)
        
        
        
        return res.json({
            success: true,
            imageUrl: imageUrl,
            fromCache: false
        })
    }catch(error){
        
        return res.status(400).json({
            success:false,
            error: error
        })
    }
    
})




app.listen(PORT,()=>{
    console.log("Servidor corriendo")
})