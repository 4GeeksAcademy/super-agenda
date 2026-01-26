import { useEffect, useState } from "react"
import { getAgenda, getAllAgendas, type GetAgendasErrorType } from "../services/agendaServices"
import { InteractiveButton } from "../components/InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"
import { useNavigate } from "react-router"

export const saveAgenda = async (agenda: string, dispatch: any) => {

    if (!dispatch) throw new Error("dispatch is not defined")

    const agendaFromFetch = await getAgenda(agenda)
    dispatch({ type: "SET_AGENDA", payload: agendaFromFetch })

}

export const User = () => {

  

    const { store, dispatch, openModal, loadAgendas } = useContactReducer()
    const navigate = useNavigate()



    const handleCreateUserBtn = ()=>{
        openModal({type: "createUser"})
    }

    
    const agendaHandleClick = async(agenda: string) => {
        await saveAgenda(agenda, dispatch)
        navigate(`/${agenda}/contacts`)
    }

    useEffect(() => {
        loadAgendas()
    }, [])

    return (
        <div>
           <InteractiveButton text="Create user" tone="normal" color="blue" onClick={handleCreateUserBtn} />
            For a fresh start, you need to choose one of us registered users
            <ul>
                {Array.isArray(store?.agendas) && store.agendas?.map((agenda, index) => {
                    return <li key={index}><InteractiveButton onClick={() => agendaHandleClick(agenda.slug)} tone="normal" color="red" text={agenda.slug.toUpperCase()} />
                    <i onClick={()=> openModal({type: "deleteUser", agenda:agenda.slug})} className="fa-solid fa-xmark hover:text-red-500 hover:cursor-pointer"></i>
                    </li>
                })}
            </ul>
        </div>
    )
}