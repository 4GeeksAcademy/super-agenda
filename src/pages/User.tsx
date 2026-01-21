import { useEffect, useState } from "react"
import { getAllAgendas, type GetAgendasErrorType } from "../services/userServices"
import { InteractiveButton } from "../components/InteractiveButton"

export const User = () => {

    type AgendaType = {
        slug: string
        id: number
    }

    const [agendas, setAgendas] =  useState<AgendaType[] | GetAgendasErrorType>([])

    const getAgendas = async() =>{
        const fetchAgendas = await getAllAgendas()
        setAgendas(fetchAgendas)
    }

    useEffect(()=>{

        getAgendas()
        
    },[])

    return (
        <div>
            <button onClick={()=> console.log(agendas)} type="button">Ver agendas en console</button>
            For a fresh start, you need to choose one of us registered users
            <ul>
                {Array.isArray(agendas) && agendas?.map((agenda)=>{
                    return <li>{agenda.slug.toUpperCase()}</li>
                })}
            </ul>
        </div>
    )
}