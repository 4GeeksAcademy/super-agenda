import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { createContact } from "../../services/contactServices"
import { FieldCreateContact } from "./FieldCreateContacts"
import { InputFormCreateContact } from "./InputFormCreateContact"
import { uploadCloudinary, validateField } from "./utilsModal"




export const ModalCreateContact = ({ closeModal }: ModalModelType) => {

    const defaultImageUrl = "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"
    const { store, loadAgenda } = useContactReducer()
    const [photoInput, setPhotoInput] = useState("")
    const [displayPhoto, setDisplayPhoto] = useState(defaultImageUrl)

    useEffect(() => {
        const img = new Image()
        img.src = photoInput
        img.onload = () => setDisplayPhoto(photoInput)
        img.onerror = () => setDisplayPhoto(defaultImageUrl)

    }, [photoInput])

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

    const handleUrlPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        setPhotoInput(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!isFormValid) return

        if (store?.slug) {



            const fetchFormData = { ...formData, address: formData.address + "||" + displayPhoto }

            const created = await createContact(store?.slug, fetchFormData)
            if (created) {
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

    type ImageUploadModeType = "url" | "upload" | "ai"

    const [imageUploadMode, setImageUploadMode] = useState<ImageUploadModeType>("url")

    const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        const imageUrl = await uploadCloudinary(file)
        setDisplayPhoto(imageUrl)
    }


    return (
        <div className="relative">
            <div className="p-5 bg-slate-400 text-slate-700">
                <h3 className="text-3xl">Create contact</h3></div>
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-5 min-w-90 max-w-110 xl:max-w-160 p-5 ">
                <div className="col-span-12">
                    <div className="flex flex-col items-center justify-center">
                        Choose your upload image method
                        <div>
                            {/* Botones para cambiar el tipo de metodo de subida */}
                            <button onClick={() => setImageUploadMode("url")} type="button" className="px-4 py-2 rounded-xl bg-sky-300">URL</button>
                            <button onClick={() => setImageUploadMode("upload")} type="button" className="px-4 py-2 rounded-xl bg-red-300">Upload</button>
                            <button onClick={() => setImageUploadMode("ai")} type="button" className="px-4 py-2 rounded-xl bg-orange-300">AI</button>
                        </div>
                        <div className="flex flex-col gap-5 w-50">
                            {/* Vista pestaña URL */}
                            <div className={`${imageUploadMode === "url" ? "flex" : "hidden"} flex flex-col`}>
                                <img className="w-full h-50 object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                <div>
                                    <label>Enter your image url</label>
                                    <input placeholder={defaultImageUrl} className="border-1 rounded-xl w-full h-10 pl-4 text-slate-600" value={photoInput} onChange={handleUrlPhoto} type="text"></input>
                                </div>
                            </div>


                            {/* Vista pestaña Upload */}
                            <div className={`${imageUploadMode === "upload" ? "flex" : "hidden"} flex flex-col gap-3 justify-center items-center`}>
                                <div>
                                    <div className="relative h-50 w-full">
                                    <img className="w-full h-full object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                    <div className="absolute top-1/2 -translate-y-1/2 bg-white/70  ">Cargando...</div>
                                    </div>
                                    <div>
                                        <label className="px-4 py-2 bg-red-300 rounded-xl text-red-100 hover:cursor-pointer" htmlFor="uploadInput">Upload image</label>
                                        <input onChange={handleUploadImage} className="hidden" id="uploadInput" type="file"></input>
                                    </div>
                                </div>
                            </div>


                            {/* Vista pestaña AI */}
                            <div className={`${imageUploadMode === "ai" ? "flex" : "hidden"} flex flex-col`}>
                                <img className="w-full h-50 object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                <div>
                                    <label>Enter your ai image</label>
                                    <input placeholder={defaultImageUrl} className="border-1 rounded-xl w-full h-10 pl-4 text-slate-600" value={photoInput} onChange={handleUrlPhoto} type="text"></input>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
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
                <button onClick={() => closeModal()} className="hover:cursor-pointer">
                    <i className="text-2xl fa-solid fa-xmark text-slate-700"></i>
                </button>
            </div>
        </div>
    )
}
