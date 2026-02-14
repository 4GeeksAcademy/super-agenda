import { useEffect, useState, type ChangeEvent } from "react"
import { getAgenda, getAllAgendas, type GetAgendasErrorType } from "../services/agendaServices"
import { InteractiveButton } from "../components/InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { SearchInput } from "../components/SearchInput"

export const saveAgenda = async (agenda: string, dispatch: any) => {

    if (!dispatch) throw new Error("dispatch is not defined")

    const agendaFromFetch = await getAgenda(agenda)
    dispatch({ type: "SET_AGENDA", payload: agendaFromFetch })

}

export const Agendas = () => {



    const { store, dispatch, openModal, loadAgendas } = useContactReducer()
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>)=>{

    }

    const agendaHandleClick = async (agenda: string) => {
        await saveAgenda(agenda, dispatch)
        navigate(`/${agenda}/contacts`)
    }


    const handleCreateUserBtn = () => {
        openModal({ type: "createAgenda" })
    }

    let agendas = Array.isArray(store?.agendas) && store?.agendas.slice(5 * page - 5, 5 * page)
    let disabled = Array.isArray(store?.agendas) && store?.agendas.length / (5 * page) <= 1


    useEffect(() => {
        loadAgendas()
    }, [])

    return (
        <div className="relative">
            <div className="absolute inset-x-0 top-0 bottom-1/2 z-0 bg-slate-700"></div>
            <div className="absolute inset-x-0 top-1/2 -bottom-12 z-0 bg-slate-900"></div>
            <div className="relative z-1  mx-auto w-full sm:w-[600px] lg:w-[700px]  py-10">
                <div className="ml-3 sm:ml-6 p-1 flex">

                    <button onClick={() => navigate(-1)} className="pr-6 pl-3 py-3 bg-slate-200 rounded-full hover:cursor-pointer hover:bg-slate-100 active:bg-slate-300"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>

                </div>
                <div className="flex justify-center p-3">
                    <div>
                        <h2 className="text-4xl sm:text-5xl py-5 text-slate-50 text-center px-10 sm:px-15">Choose a Contacts Agenda</h2>
                    </div>
                </div>
                
              <SearchInput themeDark={true}/>

                <div className="bg-slate-300 border-2 border-slate-900 mx-10 sm:mx-15 rounded-3xl flex justify-center ">
                    <div className="p-5 w-80 flex justify-center flex-col text-center gap-4">
                        <div className="h-140">
                            <ul className="flex flex-col">
                                {Array.isArray(agendas) && agendas.map((agenda, index) => {
                                    return <li className=" py-4 border-b-2 border-slate-700 px-2" key={index}>
                                        <div className="relative group">
                                            <div
                                                onClick={() => agendaHandleClick(agenda.slug)}
                                                className="relative z-2 text-orange-100 hover:bg-orange-300 active:bg-orange-500 bg-orange-400 w-full py-3 rounded-2xl
                                     transform hover:scale-105 transition hover:duration-300 hover:cursor-pointer">
                                                <button className="hover:cursor-pointer">{agenda.slug.toUpperCase()}</button>
                                            </div>
                                            <div onClick={() => openModal({ type: "deleteUser", agenda: agenda.slug })} className="absolute bottom-0 right-1 transform group-hover:translate-x-1/2 z-1 w-20 transition group-hover:duration-400 text-right p-2
                                        hover:bg-red-100 active:bg-red-300 bg-red-200
                                        text-red-500 hover:cursor-pointer rounded-2xl">
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                        </div>
                                    </li>
                                })}

                                {/* Boton para agregar una agenda */}
                                <li className="py-4  px-2">
                                    <button onClick={handleCreateUserBtn} className="text-orange-50 hover:bg-orange-100 active:bg-orange-300 bg-orange-200 w-full py-3 rounded-2xl
                                    transform hover:scale-115 transition hover:duration-300 hover:cursor-pointer">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </li>

                            </ul>
                        </div>
                        <div className="flex justify-center ">
                            <div className="w-35 flex justify-between text-xl">
                                <button className={`hover:cursor-pointer transform hover:scale-115 transition hover:duration-300 ${page == 1 ? "text-slate-50" : "text-slate-800"}`} disabled={page == 1} onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}><i className="fa-solid fa-angle-left"></i></button>
                                <button>{page}</button>
                                <button className={`hover:cursor-pointer  transform hover:scale-115 transition hover:duration-300 ${disabled ? "text-slate-50" : "text-slate-900"}`} disabled={disabled} onClick={() => setPage(prev => prev + 1)}><i className="fa-solid fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



// <div>
//    <InteractiveButton text="Create user" tone="normal" color="blue" onClick={handleCreateUserBtn} />
//     For a fresh start, you need to choose one of us registered users
//     <ul>
//         {Array.isArray(store?.agendas) && store.agendas?.map((agenda, index) => {
//             return <li key={index}><InteractiveButton onClick={() => agendaHandleClick(agenda.slug)} tone="normal" color="red" text={agenda.slug.toUpperCase()} />
//             <i onClick={()=> openModal({type: "deleteUser", agenda:agenda.slug})} className="fa-solid fa-xmark hover:text-red-500 hover:cursor-pointer"></i>
//             </li>
//         })}
//     </ul>
// </div>