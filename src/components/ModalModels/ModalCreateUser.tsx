import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { createAgenda, getAllAgendas } from "../../services/agendaServices"
import { useContactReducer } from "../../hooks/useContactReducer"
import { useNavigate } from "react-router"


export const ModalCreateUser = ({ closeModal }: ModalModelType) => {

    const [userField, setUserField] = useState<string>("")
    const [fieldMessage, setFieldMessage] = useState("")
    const { store, loadAgendas, loadAgenda } = useContactReducer()
    const [created, setCreated] = useState(false)
    const navigate = useNavigate()
    const requiredError = "Required. Must be at least 6 characters."

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserField(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userField.trim() == "" || userField.length > 0 && userField.length < 6) {
            setFieldMessage(requiredError)
            return
        } else {
            setFieldMessage("")
        }

        loadAgendas()

        const exist = Array.isArray(store?.agendas) && store.agendas.some((agenda) => {
            return agenda.slug.toLowerCase() == userField.toLowerCase()
        })

        if (!exist) {
            await createAgenda(userField)
            loadAgendas()
            setCreated(true)
            setFieldMessage(`${userField}'s agenda created successfully`)
            loadAgenda(userField)
            setTimeout(()=>{
                navigate(`/${userField}/contacts`)
                closeModal()
            },1000)
           
            
        } else {
            setFieldMessage("This agenda already exist")
        }
    }



    const btnClass = "py-2 rounded-2xl hover:cursor-pointer transform hover:scale-105 transition duration-300"

    const confirmClasses = "hover:bg-teal-400 active:bg-teal-600 text-teal-100 bg-teal-500 px-4"
    const confirmDisabledClasses = "bg-teal-200 px-4 text-teal-50"


    const discardClasses = "hover:bg-slate-300 active:bg-slate-500 text-slate-100  bg-slate-400 px-4"



    return (
        <div className="min-h-80 sm:w-74">
            <div className="w-full md:w-full text-right">
                <button className="transform hover:scale-110 transition duration-300 hover:cursor-pointer hover:text-slate-400" onClick={()=> closeModal()}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form className="text-center flex h-full flex-col justify-between pb-5" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <img className="h-35" src="https://assets.streamlinehq.com/image/private/w_512,h_512,ar_1/f_auto/v1/icons/3/notebook-mbbvkaamdha7zb0jeri2f.png/notebook-5zwrssff6cf83cp5ekvqn5.png?_a=DATAiZAAZAA0"/>
                </div>
                <div>
                    <label className="text-2xl">Write your agenda name</label>
                    <div className="my-4">

                        <input onChange={handleChange} value={userField} className="w-full h-8 border-1 border-slate-300 rounded-xl focus:bg-slate-100 focus:outline-none px-3 text-slate-600" type="text" />
                        {fieldMessage && (
                            created ?
                                <p className="text-green-500 py-2 px-1 mt-2 rounded-xl border-green-400 border-1 bg-green-200 ">{fieldMessage}</p>
                                :
                                <p className="text-red-500 py-2 px-1 mt-2 rounded-xl border-red-400 border-1  bg-red-200">{fieldMessage}</p>
                        )
                        }
                    </div>
                </div>
                <div className="flex w-full justify-evenly" >

                    {
                        created ?
                            <>
                                <button className={`py-2 rounded-2xl mr-3 ${confirmDisabledClasses}`} disabled={true} >Created</button>
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
