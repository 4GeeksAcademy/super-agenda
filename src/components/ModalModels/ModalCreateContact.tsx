import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { createContact } from "../../services/contactServices"
import { FieldCreateContact } from "./FieldCreateContacts"

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
    const [sended, setSended] = useState(false)  
    const btnClass = "transform hover:scale-110 transition hover:duration-300"

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
        
        setSended(true)

        for (let field in formData) {
            const key = field as keyof typeof formData

            const value: string = formData[key]

            setErrors(prev => ({ ...prev, [key]: value.trim().length < 6 }))

            if(key === "email"){

                const emailRegex =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                if(!emailRegex.test(value)){
                    alert("Please enter a valid email address (e.g. user@domain.com)")
                }
            }
            // if (value.trim().length < 6) {
            //     if (!error) {
            //         error = true
            //     }
            //     setFieldMessage("Please enter at least 6 characters in every field.")
            // }
        }
        // loadAgenda(store?.slug)

        // const exist = Array.isArray(store?.contacts) && store.contacts.some((contact) => {
        //     const contactName = contact.name.replace(" ", "").toLowerCase()
        //     const formDataName = formData.name.replace(" ", "").toLowerCase()
        //     return contactName == formDataName
        // })

        // if (exist) {
        //     setFieldMessage("This contact name already exist, try another one")
        //     setErrors({...errors, name : true})
        //     return
        // }
        // if (!error) {
        //     setFieldMessage("")
        // } else {
        //     return
        // }

        // const createdContact = await createContact(store.slug, formData)

        // if (createdContact) {
        //     setCreated(true)
        //     setFieldMessage(`${store.slug}'s contact has been successfully added`)
        //     loadAgenda(store.slug)
        //     closeModal()
        // }
    }


    return (
        <>
            <div className="relative pt-6">
                <div  className={`${btnClass} absolute top-0 right-0 p-1 rounded-lg  hover:bg-slate-200`}>
                    <button onClick={() => closeModal()}className="fa-solid fa-xmark hover:cursor-pointer"></button>
                </div>
                <div className="text-center ">
                    <span className="text-2xl">Add a new contact</span>
                </div>
                <img className="w-20 mx-auto opacity-75 my-3" src="https://marketplace.canva.com/Dz63E/MAF4KJDz63E/1/tl/canva-user-icon-MAF4KJDz63E.png"/>

                <form className="flex flex-col max-w-70 py-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col bg-slate-50 rounded-xl p-5">

                    {fields.map((field, index) => {
                        // return (<><FormField disabled={created} key={index} formData={formData} field={field} handleChange={handleChange} /> </>)

                        return (
                            <FieldCreateContact field={field} sended={sended} created={created} errors={errors} handleChange={handleChange} />
                        )
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
                                    <InteractiveButton extraClass={btnClass} tone="disabled" color="green" text="Created" />
                                    <InteractiveButton extraClass={btnClass} tone="normal" buttonType="button" color="slate" text="Close" onClick={() => closeModal()} />
                                </>
                                :
                                <>
                                    <InteractiveButton extraClass={btnClass} tone="normal" color="green" text="Create" />
                                    <InteractiveButton extraClass={btnClass} buttonType="button" tone="normal" color="slate" text="Cancel" onClick={() => closeModal()} />
                                </>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
