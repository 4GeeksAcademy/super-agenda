import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { createAgenda, getAllAgendas } from "../../services/agendaServices"
import { useContactReducer } from "../../hooks/useContactReducer"


export const ModalCreateUser = ({ closeModal }: ModalModelType) => {

    const [userField, setUserField] = useState<string>("")
    const [fieldMessage, setFieldMessage] = useState("")
    const {store, loadAgendas} = useContactReducer()
    const [created, setCreated] = useState(false)
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
        }else{
            setFieldMessage("This agenda already exist")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormField disabled={created} userField={userField} handleChange={handleChange} field="name" />
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
