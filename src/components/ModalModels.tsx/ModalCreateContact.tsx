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

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        address: false
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const name = event.target.name
        const value = event.target.value

        setFormData({ ...formData, [name]: value })
        setErrors(prev => {
            return ({ ...prev, [name]: value.trim().length < 6 })
        })
    }



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!store?.slug) throw new Error("Agenda not valid")

        let error = false

        for (let field in formData) {
            const key = field as keyof typeof formData

            const value: string = formData[key]
            setErrors(prev => ({ ...prev, [key]: value.trim().length < 6 }))

            if (value.trim().length < 6) {
                if (!error) {
                    error = true
                }
                setFieldMessage("Please enter at least 6 characters in every field.")
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
            setErrors({...errors, name : true})
            return
        }
        if (!error) {
            setFieldMessage("")
        } else {
            return
        }

        const createdContact = await createContact(store.slug, formData)

        if (createdContact) {
            setCreated(true)
            setFieldMessage(`${store.slug}'s contact has been successfully added`)
            loadAgenda(store.slug)
        }
    }


    return (
        <>
            <div className="relative pt-6">
                <div onClick={() => closeModal()} className="absolute top-0 right-0 p-1 rounded-lg hover:cursor-pointer hover:bg-slate-200">
                    <i className=" fa-solid fa-xmark"></i>
                </div>
                <div className="text-center ">
                    <span className="text-2xl">Add a new contact</span>
                </div>
                <img className="w-20 mx-auto opacity-75 my-3" src="https://marketplace.canva.com/Dz63E/MAF4KJDz63E/1/tl/canva-user-icon-MAF4KJDz63E.png"/>

                <form className="flex flex-col max-w-70 py-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col bg-slate-50 rounded-xl p-5">

                    {fields.map((field, index) => {
                        // return (<><FormField disabled={created} key={index} formData={formData} field={field} handleChange={handleChange} /> </>)
                        const capitalized = field[0].toUpperCase() + field.slice(1)
                        return (<>
                            <label htmlFor={field}>{capitalized}</label>
                            <input className={`mb-4 ${errors[field] ?
                                "focus:outline-red-300 bg-red-100 text-red-400 border-red-300 "
                                : "focus:outline-slate-400 bg-slate-100 text-slate-500 border-slate-300 "
                            } border-1  h-9 rounded-xl px-3 `}
                            id={field} disabled={created}
                            key={index}
                            name={field}
                            onChange={handleChange} />
                        </>)
                    })}
                    {
                        created ?
                        <p className="text-green-500 whitespace-wrap">{fieldMessage}</p>
                        :
                        <p className="text-red-500">{fieldMessage}</p>
                    }
                    </div>
                    <div className="flex justify-evenly mt-2 ">
                        {
                            created ?
                                <>
                                    <InteractiveButton tone="disabled" color="green" text="Created" />
                                    <InteractiveButton tone="normal" buttonType="button" color="slate" text="Close" onClick={() => closeModal()} />
                                </>
                                :
                                <>
                                    <InteractiveButton tone="normal" color="green" text="Create" />
                                    <InteractiveButton buttonType="button" tone="normal" color="slate" text="Cancel" onClick={() => closeModal()} />
                                </>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
