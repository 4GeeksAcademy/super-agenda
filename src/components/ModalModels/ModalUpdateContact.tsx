import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { updateContact } from "../../services/contactServices"
import type { FormDataType } from "../../hooks/useContactReducer/store"
import { validateField } from "./utilsModalCreateContact"
import { InputFormCreateContact } from "./InputFormCreateContact"
import isEqual from "lodash.isequal"

export const ModalUpdateContact = ({ closeModal }: ModalModelType) => {

    
    const { store, loadAgenda } = useContactReducer()
    const [photoInput, setPhotoInput] = useState("")
    
    const [formData, setFormData] = useState<FormDataType>(store?.modalFormData ?? {
        name: "",
        phone: "",
        address: "",
        email: "",
        id: 1
    })
    
    const defaultImageUrl = formData.address.split("||")[1]
    const [displayPhoto, setDisplayPhoto] = useState(defaultImageUrl)



    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        address: "",
        email: ""
    })


    useEffect(() => {
        const img = new Image()
        img.src = photoInput
        img.onload = () => setDisplayPhoto(photoInput)
        img.onerror = () => setDisplayPhoto(defaultImageUrl)

    }, [photoInput])



    const handleUrlPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        setPhotoInput(event.target.value)
    }

    const initialFormData = store?.modalFormData

    const hasFormDataChanged = useMemo(() => {
        return !isEqual(formData, initialFormData) || defaultImageUrl != displayPhoto
    }, [formData, displayPhoto])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!isFormValid) return


        if (store?.slug) {

            const clearAddress = formData.address.split("||")[0]
            const fetchFormData = {...formData, address: clearAddress + "||" + displayPhoto}
  
            const updated = await updateContact(store?.slug, fetchFormData)
            console.log(updated)
            if (updated) {
                loadAgenda(store.slug)
                closeModal()
            }
        }

    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
        if (store && formData.id) {
            const error = validateField(name, value, store, formData.id)

            setErrors(prev => ({
                ...prev, [name]: error
            }))
        }
    }

    const isFormValid = Object.values(errors).every(error => error === "") && Object.values(formData).every(input => input != "")



    return (

        <div className="relative">
            <div className="p-5 bg-slate-400 text-slate-700">
                <h3 className="text-3xl">Edit your contact</h3></div>
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-5 min-w-90 max-w-110 xl:max-w-160 p-5 ">
                <div className="col-span-12 flex flex-col items-center justify-center">
                    <div className="w-50 flex flex-col gap-5">
                        <img className="w-full h-50 object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                        <div>
                            <label >Enter your new image url</label>
                            <input placeholder={defaultImageUrl} className="border-1 rounded-xl w-full h-10 pl-4 text-slate-600" value={photoInput} onChange={handleUrlPhoto} type="text"></input>
                            </div>
                    </div>
                </div>
                {fields.map((field) => {
                    return <InputFormCreateContact name={field} value={formData[field]} error={errors[field]} onChange={handleChange} />
                })}

                <div className="flex gap-10 mt-5">
                    <button disabled={!isFormValid || !hasFormDataChanged} type="submit" className={`text-orange-100 ${isFormValid && hasFormDataChanged ? "bg-orange-500 hover:bg-orange-400 active:bg-orange-600" : "bg-orange-200 "} 
                            px-10 py-2 ${isFormValid ? "hover:cursor-pointer" : "hover:cursor-default"} text-lg rounded-xl
                            `} >Save</button>
                    <button type="button" onClick={() => closeModal()} className=" hover:bg-slate-300 hover:cursor-pointer px-10 py-2 rounded-xl text-lg">Cancel</button>
                </div>
            </form>
            <div className="absolute top-0 right-0 py-3 pr-2">
                <button onClick={() => closeModal()} className="hover:cursor-pointer">
                    <i className="text-2xl fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>

    )
}






















{/* <div className="relative pt-6">
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
    </div> */}
// <form onSubmit={handleSubmit}>
// const [userField, setUserField] = useState<string>("")
// const { store, loadAgenda } = useContactReducer()
// const [updated, setUpdated] = useState<boolean>(false)
// const [fieldMessage, setFieldMessage] = useState<string>("")
// const [formData, setFormData] = useState(store?.modalFormData)
//  const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     email: false,
//     address: false
// })



// const btnClass = "transform hover:scale-110 transition hover:duration-300"


// const initialFormData = store?.modalFormData

// const formDataFields : (keyof FormDataType)[] = ["name", "email", "address", "phone"]


// const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     if(store?.slug && formData){

//         let changes = 0
//         for(let field of formDataFields){
//             if(initialFormData){
//                 if(formData[field] != initialFormData[field]){
//                     changes += 1
//                 }
//                 }
//         }
//         if(changes > 0){
//             const updatedContact = await updateContact(store?.slug, formData)
//             if(updatedContact){
//                  loadAgenda(store?.slug)
//                  setFieldMessage(`${store?.slug.toUpperCase()}'s contact has been updated`)
//                  setUpdated(true)
//                  closeModal()
//             }
//         } else{
//             setFieldMessage("You must update at least 1 field")
//         }
//     }

// }

// const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value
//     const name = event.target.name
//     setFormData(prev => {
//         if (prev) {
//             return { ...prev,[name]: value }
//         }
//     })
// }
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