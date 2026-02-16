import type { StoreType } from "../../hooks/useContactReducerTypes"


const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

export const validateField = (name:string, value:string, store?: StoreType, id?: number)=>{

    if(value.trim().length < 5){
        return "Introduce at least 5 characters"
    }

    if(name === "email"){
       const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
       if(!emailRegex.test(value)){
            return "Please enter a valid email address (e.g. user@domain.com)"
       }
    }

    if(name === "name" && store?.contacts){
        const exist = store.contacts.some(contact =>{
            return contact.name.replace(" ", "").toLowerCase() === value.replace(" ", "").toLowerCase() && contact.id != id
        })
        if(exist){
            return "This contact already exists"
        }
    } 

    if(name == "phone"){
        const phoneRegex = /^\+?\d[\d\s\-()]{6,14}\d$/;
        if(!phoneRegex.test(value)){
            return "Phone format is not valid(e.g. +34 657 512 514"
        }
    }
    return ""
}


export const validateAgendaField = (value:string, store?:StoreType)=>{
     if(store?.agendas){
        const exist = store.agendas.some(contact =>{
            return contact.slug.replace(" ", "").toLowerCase() === value.replace(" ", "").toLowerCase()
        })
        if(exist){
            return "This contact already exists"
        }
    } 
    if(value.trim().length < 5 && value.trim().length >= 0){
        return "Introduce at least 5 characters"
    }
    return ""
}


export const uploadCloudinary = async(file:File)=>{

    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)

    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,{
        method: "POST",
        body: formData
    })

    const data = await response.json()
    return data.secure_url
}