import { useEffect, useState } from "react"
import { getAgenda, getAllAgendas, type GetAgendasErrorType } from "../services/userServices"
import { InteractiveButton } from "../components/InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"

export const User = () => {

    type AgendaType = {
        slug: string
        id: number
    }

    const [agendas, setAgendas] =  useState<AgendaType[] | GetAgendasErrorType>([])
    const {dispatch} = useContactReducer()

    const getAgendas = async() =>{
        const fetchAgendas = await getAllAgendas()
        setAgendas(fetchAgendas)
    }



    const saveAgenda = async(agenda: string) =>{

        if(!dispatch)throw new Error("dispatch is not defined")
        
        const agendaFromFetch = await getAgenda(agenda) 

        dispatch({type: "SET_AGENDA", payload: agendaFromFetch})
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
                    return <li><InteractiveButton  color="red" text={agenda.slug.toUpperCase()}/></li>
                })}
            </ul>
        </div>
    )
}