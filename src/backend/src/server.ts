import express, {Request,Response} from 'express'
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = 3001

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})


app.use(cors())
app.use(express.json())

app.get("/", (req:Request, res: Response)=>{
res.json({message: "Servidor funciona correctamente"})
})

app.listen(PORT,()=>{
    console.log("Servidor corriendo")
})