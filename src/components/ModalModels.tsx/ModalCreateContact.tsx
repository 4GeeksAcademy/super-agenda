import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { createAgenda } from "../../services/agendaServices"
import { useContactReducer } from "../../hooks/useContactReducer"


export const ModalCreateContact= ({ closeModal }: ModalModelType) => {

   const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address:""
    })
    const [fieldMessage, setFieldMessage] = useState("")
    // const {store, loadAgendas} = useContactReducer()
    const [created, setCreated] = useState(false)
    const requiredError = "Required. Must be at least 6 characters."


    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if (userField.trim() == "" || userField.length > 0 && userField.length < 6) {
    //         setFieldMessage(requiredError)
    //         return
    //     } else {
    //         setFieldMessage("")
    //     }

    //     loadAgendas()

    //     const exist = Array.isArray(store?.agendas) && store.agendas.some((agenda) => {
    //         return agenda.slug.toLowerCase() == userField.toLowerCase()
    //     })

    //     if (!exist) {
    //         await createAgenda(userField)
    //         loadAgendas()
    //         setCreated(true)
    //         setFieldMessage(`${userField}'s agenda created successfully`)
    //     }else{
    //         setFieldMessage("This agenda already exist")
    //     }
    // }

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
               {fields.map((field, index)=>{
            return  <FormField key={index} formData={formData} field={field} handleChange={handleChange}/>
        })}
                {
                    created ? 
                    <p className="text-green-500">{fieldMessage}</p>
                    :
                    <p className="text-red-500">{fieldMessage}</p>
                }
                {
                    created ?
                        <>
                            <InteractiveButton color="disabled-green" text="Created" />
                            <InteractiveButton buttonType="button" color="slate" text="Close" onClick={() => closeModal()} />
                        </>
                        :
                        <>
                            <InteractiveButton color="green" text="Create" />
                            <InteractiveButton buttonType="button" color="slate" text="Cancel" onClick={() => closeModal()} />
                        </>
                }
            </form>
        </>
    )
}
