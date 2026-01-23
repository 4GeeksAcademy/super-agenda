import type { ItemType } from "../components/Card"

export const deleteContact = async(agenda:string, contactId: number)=>{
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${contactId}`,
        {
            method: "DELETE"
        })

    return response.status == 204
 
}


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

    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })


}