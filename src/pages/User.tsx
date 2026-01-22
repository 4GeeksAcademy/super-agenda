import { useEffect, useState } from "react"
import { getAgenda, getAllAgendas, type GetAgendasErrorType } from "../services/userServices"
import { InteractiveButton } from "../components/InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"
import { useNavigate } from "react-router"

export const saveAgenda = async (agenda: string, dispatch: any) => {

    if (!dispatch) throw new Error("dispatch is not defined")

    const agendaFromFetch = await getAgenda(agenda)
    dispatch({ type: "SET_AGENDA", payload: agendaFromFetch })

}

export const User = () => {

    type AgendaType = {
        slug: string
        id: number
    }

    const [agendas, setAgendas] = useState<AgendaType[] | GetAgendasErrorType>([])
    const { store, dispatch } = useContactReducer()
    const navigate = useNavigate()

    const getAgendas = async () => {
        const fetchAgendas = await getAllAgendas()
        setAgendas(fetchAgendas)
    }





    const agendaHandleClick = async(agenda: string) => {
        await saveAgenda(agenda, dispatch)
        navigate(`/${agenda}/contacts`)
    }

    useEffect(() => {
        getAgendas()
    }, [])

    return (
        <div>
            <InteractiveButton onClick={() => console.log(store)} color="orange" text="Ver store" />
            For a fresh start, you need to choose one of us registered users
            <ul>
                {Array.isArray(agendas) && agendas?.map((agenda, index) => {
                    return <li key={index}><InteractiveButton onClick={() => agendaHandleClick(agenda.slug)} color="red" text={agenda.slug.toUpperCase()} /></li>
                })}
            </ul>
        </div>
    )
}