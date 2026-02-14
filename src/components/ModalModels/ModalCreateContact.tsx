import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { createContact } from "../../services/contactServices"
import { FieldCreateContact } from "./FieldCreateContacts"
import { InputFormCreateContact } from "./InputFormCreateContact"
import { validateField } from "./utilsModalCreateContact"




export const ModalCreateContact = ({ closeModal }: ModalModelType) => {

    const { store, loadAgenda } = useContactReducer()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        email: ""
    })

    const [errors, setErrors] = useState({
        name: "Introduce at least 5 characters",
        phone: "Introduce at least 5 characters",
        address: "Introduce at least 5 characters",
        email: "Introduce at least 5 characters"
    })


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!isFormValid) return

        if(store?.slug){

            const created = await createContact(store?.slug, formData)
            if(created){
                loadAgenda(store.slug)
                closeModal()
            }
        }

    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
        if (store) {
            const error = validateField(name, value, store)

            setErrors(prev => ({
                ...prev, [name]: error
            }))
        }
    }

    const isFormValid = Object.values(errors).every(error => error === "") && Object.values(formData).every(input => input != "") 
    

    return (
        <div className="relative">
            <div className="p-5 bg-slate-400 text-slate-700">
                <h3 className="text-3xl">Create contact</h3></div>
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-5 min-w-90 max-w-110 xl:max-w-160 p-5 ">
                {fields.map((field) => {
                    return <InputFormCreateContact name={field} value={formData[field]} error={errors[field]} onChange={handleChange} />
                })}
                <div className="flex gap-10 mt-5">
                    <button disabled={!isFormValid} type="submit" className={`text-orange-100 ${isFormValid ? "bg-orange-500 hover:bg-orange-400 active:bg-orange-600" : "bg-orange-200 "} 
                    px-10 py-2 ${isFormValid ? "hover:cursor-pointer" : "hover:cursor-default"} text-lg rounded-xl
                    `} >Save</button>
                    <button type="button" onClick={() => closeModal()} className=" hover:bg-slate-300 hover:cursor-pointer px-10 py-2 rounded-xl text-lg">Cancel</button>
                </div>
            </form>
            <div className="absolute top-0 right-0 py-3 pr-2">
                <button onClick={()=> closeModal()} className="hover:cursor-pointer">
                <i className="text-2xl fa-solid fa-xmark text-slate-700"></i>
                </button>
                </div>
        </div>
    )
}
