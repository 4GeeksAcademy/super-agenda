type AgendaType = {
    "slug": string,
    "id": number
} 

type ErrorType = {
    "details": string
}

export const getAllAgendas = async(): Promise<AgendaType[] |ErrorType>  => {
    const response = await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")

    const data = await response.json()
    return data
}