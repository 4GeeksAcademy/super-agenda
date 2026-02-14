import type { StoreType } from "../../hooks/useContactReducerTypes"

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