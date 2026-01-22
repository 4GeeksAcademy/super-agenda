import type { ItemType } from "../Card"

export const updateContact = async(agenda:string, contactId: number, formData: ItemType)=>{

    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${contactId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(formData)
    })

}

export const createContact = async(agenda:string, formData: ItemType) =>{

    

}