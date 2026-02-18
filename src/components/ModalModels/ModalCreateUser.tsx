import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { createAgenda, getAllAgendas } from "../../services/agendaServices"
import { useContactReducer } from "../../hooks/useContactReducer"
import { useNavigate } from "react-router"
import { validateField } from "./utilsModal"
import { validateAgendaField } from "./utilsModal"


export const ModalCreateUser = ({ closeModal }: ModalModelType) => {

    const [userField, setUserField] = useState<string>("")
    const { store, loadAgendas, loadAgenda } = useContactReducer()
    const navigate = useNavigate()


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserField(event.target.value)
    }

    const error = useMemo(() => {
        return validateAgendaField(userField, store)

    }, [userField])



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        loadAgendas()

            await createAgenda(userField)
            loadAgendas()
            loadAgenda(userField)
            setTimeout(() => {
                navigate(`/${userField}/contacts`)
                closeModal()
            }, 1000)

    }

    const formValid = error.length > 0


    const btnClass = "py-2 rounded-xl hover:cursor-pointer transform hover:scale-105 transition duration-300"

    const confirmClasses = "hover:bg-orange-400 active:bg-orange-600 text-orange-100 bg-orange-500 px-4"
    const confirmDisabledClasses = "bg-orange-200 px-4 text-orange-50"


    const discardClasses = "hover:bg-slate-300 active:bg-slate-500 text-slate-100 text-slate-700 px-4"



    return (
        <div className="min-w-80 max-w-120">
            <div className="relative" >
                <div className="absolute top-0 right-0 p-1 ">
                    <button className=" hover:cursor-pointer hover:text-slate-700 text-xl" onClick={() => closeModal()}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="text-3xl p-4 bg-slate-400 text-slate-800">
                    <h3 >Create your agenda</h3>
                </div>
            </div>
            <form className="px-5 pb-5" onSubmit={handleSubmit}>
                <div className="m-10 ml-2">
                    <label className="text-lg" htmlFor="name">Write your new agenda's name</label>
                    <input id="name" onChange={handleChange} value={userField} className="w-full h-10 border-1 border-slate-300 rounded-xl focus:bg-slate-100 focus:outline-none px-3 text-slate-600" type="text" />
                    {error && (
                        <p className="text-orange-400 py-1 px-1 mt-2 rounded-xl">{error}</p>
                    )
                    }
                </div>

                <div className="flex w-full justify-start mt-5" >

                    {
                        formValid ?
                            <>
                                <button className={`py-2 rounded-2xl mr-3 ${confirmDisabledClasses}`} disabled={true} >Create</button>
                                <button className={`${btnClass} ${discardClasses}`} onClick={() => closeModal()} >Close</button>
                            </>
                            :
                            <>
                                <button className={`${btnClass} ${confirmClasses} mr-3`}  >Create</button>
                                <button className={`${btnClass} ${discardClasses}`} onClick={() => closeModal()} >Cancel</button>
                            </>
                    }
                </div>
            </form>
        </div>
    )
}
