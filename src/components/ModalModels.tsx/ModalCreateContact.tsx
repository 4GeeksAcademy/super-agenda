import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { createContact } from "../../services/contactServices"

export const ModalCreateContact = ({ closeModal }: ModalModelType) => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })
    const [fieldMessage, setFieldMessage] = useState("")
    const { store, loadAgenda } = useContactReducer()
    const [created, setCreated] = useState(false)
    const requiredError = "Required. Must be at least 6 characters."


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!store?.slug) throw new Error("Agenda not valid")

        for (let field in formData) {
            const key = field as keyof typeof formData

            const value: string = formData[key]

            if (value.length > 0 && value.length < 6) {
                setFieldMessage("Please enter at least 6 characters in every field.")
                return
            } else {
                setFieldMessage("")
            }

        }
        loadAgenda(store?.slug)

        const exist = Array.isArray(store?.contacts) && store.contacts.some((contact) => {
            const contactName = contact.name.replace(" ", "").toLowerCase()
            const formDataName = formData.name.replace(" ", "").toLowerCase()
            return contactName == formDataName
        })

        if (exist) {
            setFieldMessage("This contact name already exist, try another one")
            return
        } else {
            setFieldMessage("")
        }

     
        const createdContact = await createContact(store.slug, formData)

        if(createdContact){
            setCreated(true)
            setFieldMessage(`${store.slug}'s contact has been successfully added`)
            loadAgenda(store.slug)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => {
                    return <FormField disabled={created} key={index} formData={formData} field={field} handleChange={handleChange} />
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
