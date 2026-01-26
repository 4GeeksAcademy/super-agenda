import { useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { updateContact } from "../../services/contactServices"
import type { FormDataType } from "../../hooks/useContactReducer/store"

export const ModalUpdateContact = ({ closeModal }: ModalModelType) => {



    const [userField, setUserField] = useState<string>("")
    const { store, loadAgenda } = useContactReducer()
    const [updated, setUpdated] = useState<boolean>(false)
    const [fieldMessage, setFieldMessage] = useState<string>("")
    const [formData, setFormData] = useState(store?.modalFormData)

    const initialFormData = store?.modalFormData

    const formDataFields : (keyof FormDataType)[] = ["name", "email", "address", "phone"]


    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(store?.slug && formData){

            let changes = 0
            for(let field of formDataFields){
                if(initialFormData){
                    if(formData[field] != initialFormData[field]){
                        changes += 1
                    }        
                    }
            }

            if(changes > 0){
                const updatedContact = await updateContact(store?.slug, formData)
                if(updatedContact){
                     loadAgenda(store?.slug)
                     setFieldMessage(`${store?.slug.toUpperCase()}'s contact has been updated`)
                     setUpdated(true)
                }
            } else{
                setFieldMessage("You must update at least 1 field")
            }
        }
  
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const name = event.target.name
        setFormData(prev => {
            if (prev) {
                return { ...prev,[name]: value }
            }
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => {
                    return <FormField key={index} formData={formData} field={field} handleChange={handleChange} />
                })}
                {
                    updated ?
                        <p className="text-green-500">{fieldMessage}</p>
                        :
                        <p className="text-red-500">{fieldMessage}</p>
                }
                {
                    updated ?
                        <>
                            <InteractiveButton tone="disabled" color="green" text="Created" />
                            <InteractiveButton buttonType="button" tone="normal" color="slate" text="Close" onClick={() => closeModal()} />
                        </>
                        :
                        <>
                            <InteractiveButton tone="normal" color="green" text="Create" />
                            <InteractiveButton buttonType="button"  tone="normal" color="slate" text="Cancel" onClick={() => closeModal()} />
                        </>
                }
            </form>
        </>
    )
}