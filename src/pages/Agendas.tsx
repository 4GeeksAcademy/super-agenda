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

export const Agendas = () => {



    const { store, dispatch, openModal, loadAgendas } = useContactReducer()
    const navigate = useNavigate()

    const agendaHandleClick = async (agenda: string) => {
        await saveAgenda(agenda, dispatch)
        navigate(`/${agenda}/contacts`)
    }


    const handleCreateUserBtn = () => {
        openModal({ type: "createAgenda" })
    }



    useEffect(() => {
        loadAgendas()
    }, [])

    return (
        <div className="relative">
            <div className="absolute inset-x-0 top-0 bottom-1/2 z-0 bg-slate-700"></div>
            <div className="absolute inset-x-0 top-1/2 bottom-0 z-0 bg-slate-900"></div>
            <div className="relative z-10  mx-auto w-full sm:w-[600px] lg:w-[700px] px-5 sm:px-10 py-10">
                <div className=" p-1 flex">
                    <div>
                        <button className="pr-6 pl-3 py-3 bg-slate-200 rounded-full hover:cursor-pointer hover:bg-slate-100 active:bg-slate-300"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>
                    </div>
                </div>

                <div className="flex justify-center p-3">
                    <div>
                        <h2 className="text-3xl sm:text-4xl py-5 text-slate-50 text-center">Choose a Contacts Agenda</h2>
                    </div>
                </div>
                <div className="bg-slate-50 border-2 border-slate-900 rounded-3xl flex justify-center">
                    <div className="p-5 w-80 flex justify-center flex-col text-center gap-4">
                        <div className=" h-140 ">
                            <ul className="flex flex-col">
                                
                                <li className=" py-4 border-b-2 border-slate-700 px-2">
                                    <div className="relative group">

                                        <div className="relative z-12 text-orange-100 hover:bg-orange-300 active:bg-orange-500 bg-orange-400 w-full py-3 rounded-2xl
                                     transform hover:scale-105 transition hover:duration-300 hover:cursor-pointer">
                                            <button>agenda 1</button>
                                        </div>
                                        <div className="absolute bottom-0 right-1 transform group-hover:translate-x-1/2 z-11 w-20 transition group-hover:duration-400 text-right p-2
                                        hover:bg-red-100 active:bg-red-300 bg-red-200
                                        text-red-500 hover:cursor-pointer rounded-2xl">
                                            <i className="fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </li>
                                <li className=" py-4 border-b-2 border-slate-700 px-2">
                                    <div className="relative group">

                                        <div className="relative z-12 text-orange-100 hover:bg-orange-300 active:bg-orange-500 bg-orange-400 w-full py-3 rounded-2xl
                                     transform hover:scale-105 transition hover:duration-300 hover:cursor-pointer">
                                            <button>agenda 1</button>
                                        </div>
                                        <div className="absolute bottom-0 right-1 transform group-hover:translate-x-1/2 z-11 w-20 transition group-hover:duration-400 text-right p-2
                                        hover:bg-red-100 active:bg-red-300 bg-red-200
                                        text-red-500 hover:cursor-pointer rounded-2xl">
                                            <i className="fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </li>

                                {/* Boton para agregar una agenda */}
                                <li className="py-4  px-2">
                                    <button className="text-orange-50 hover:bg-orange-100 active:bg-orange-300 bg-orange-200 w-full py-3 rounded-2xl
                                    transform hover:scale-115 transition hover:duration-300 hover:cursor-pointer">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </li>

                            </ul>
                        </div>
                        <div className="flex justify-center ">
                            <div className="w-35 flex justify-between text-xl">
                                <button><i className="fa-solid fa-angle-left"></i></button>
                                <button>1</button>
                                <button><i className="fa-solid fa-angle-right"></i></button>
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