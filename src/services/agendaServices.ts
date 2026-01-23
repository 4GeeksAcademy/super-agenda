import type { StoreType } from "../hooks/useContactReducerTypes"

type AgendaType = {
    "slug": string,
    "id": number
} 

export type GetAgendasErrorType = {
    "details": string
}

export const getAllAgendas = async(): Promise<AgendaType[] | GetAgendasErrorType>  => {
    const response = await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")

    const data = await response.json()
    return data.agendas
}

export const getAgenda = async(agenda:string): Promise<StoreType | GetAgendasErrorType> =>{
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`)
    const data = await response.json()
    return data
}

export const createAgenda = async(agenda:string)=>{
 const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`,{
    method : "POST"
 })
 return response.status == 201
}


export const deleteAgenda = async(agenda:string)=>{

    const url = `https://playground.4geeks.com/contact/agendas/${agenda}?tags=Agenda%20operations&summary=Delete%20Agenda.&description=Deletes%20a%20specific%20agenda%20from%20the%20database.`
    const response = await fetch(url,{
    method : "DELETE"
 })
 return response.status == 204
}