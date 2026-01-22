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