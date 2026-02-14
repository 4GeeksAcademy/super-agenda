import type { StoreType } from "../../hooks/useContactReducerTypes"

export const validateField = (name:string, value:string, store: StoreType, id: number)=>{

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