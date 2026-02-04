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
     const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        address: false
    })



    const btnClass = "transform hover:scale-110 transition hover:duration-300"


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
        <div className="relative pt-6">
                <div  className={`${btnClass} absolute top-0 right-0 p-1 rounded-lg  hover:bg-slate-200`}>
                    <button onClick={() => closeModal()} className="fa-solid fa-xmark hover:cursor-pointer"></button>
                </div>
                <div className="text-center ">
                    <span className="text-4xl">Edit contact</span>
                </div>
                <img className="w-20 mx-auto opacity-75 mb-3 mt-2" src="https://cdn-icons-png.flaticon.com/512/43/43078.png"/>

                <form className="flex flex-col max-w-70 py-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col bg-slate-50 rounded-xl p-5">

                    {fields.map((field, index) => {
                        // return (<><FormField disabled={updated} key={index} formData={formData} field={field} handleChange={handleChange} /> </>)
                        const capitalized = field[0].toUpperCase() + field.slice(1)
                        return (<>
                            <label htmlFor={field}>{capitalized}</label>
                            <input className={`mb-4 ${errors[field] ?
                                "focus:outline-red-300 bg-red-100 text-red-400 border-red-300 "
                                : updated? "bg-slate-300 text-slate-400" : "focus:outline-slate-400 bg-slate-100 text-slate-500 border-slate-300 "
                            } border-1  h-9 rounded-xl px-3 `}
                            id={field} disabled={updated}
                            key={index}
                            name={field}
                            value={formData?.[field]}
                            onChange={handleChange} />
                        </>)
                    })}
                    {
                        updated ?
                        <p className="text-green-500 whitespace-wrap">{fieldMessage}</p>
                        :
                        <p className="text-red-500">{fieldMessage}</p>
                    }
                    </div>
                    <div className="flex justify-evenly mt-2 ">
                        {
                            updated ?
                                <>
                                    <InteractiveButton  tone="disabled" color="green" text="Saved" />
                                    <InteractiveButton extraClass={btnClass} tone="normal" buttonType="button" color="slate" text="Close" onClick={() => closeModal()} />
                                </>
                                :
                                <>
                                    <InteractiveButton extraClass={btnClass} tone="normal" color="green" text="Save changes" />
                                    <InteractiveButton extraClass={btnClass} buttonType="button" tone="normal" color="slate" text="Cancel" onClick={() => closeModal()} />
                                </>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
            // <form onSubmit={handleSubmit}>
            //     {fields.map((field, index) => {
            //         return <FormField key={index} formData={formData} field={field} handleChange={handleChange} />
            //     })}
            //     {
            //         updated ?
            //             <p className="text-green-500">{fieldMessage}</p>
            //             :
            //             <p className="text-red-500">{fieldMessage}</p>
            //     }
            //     {
            //         updated ?
            //             <>
            //                 <InteractiveButton tone="disabled" color="green" text="Created" />
            //                 <InteractiveButton buttonType="button" tone="normal" color="slate" text="Close" onClick={() => closeModal()} />
            //             </>
            //             :
            //             <>
            //                 <InteractiveButton tone="normal" color="green" text="Create" />
            //                 <InteractiveButton buttonType="button"  tone="normal" color="slate" text="Cancel" onClick={() => closeModal()} />
            //             </>
            //     }
            // </form>