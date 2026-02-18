import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { useContactReducer } from "../../hooks/useContactReducer"
import { createContact } from "../../services/contactServices"
import { FieldCreateContact } from "./FieldCreateContacts"
import { InputFormCreateContact } from "./InputFormCreateContact"
import { uploadCloudinary, validateField } from "./utilsModal"
import { NavImageMode } from "./NavImageMode"


export type ImageUploadModeType = "url" | "upload" | "ai"


export const ModalCreateContact = ({ closeModal }: ModalModelType) => {

    const defaultImageUrl = "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"
    const { store, loadAgenda } = useContactReducer()
    const [photoInput, setPhotoInput] = useState("")
    const [displayPhoto, setDisplayPhoto] = useState(defaultImageUrl)
    const [imageUploadMode, setImageUploadMode] = useState<ImageUploadModeType>("url")
    const [loadingImage, setLoadingImage] = useState(false)
    const [aiErrorShow, setAiErrorShow] = useState(false)
    const [aiError, setAiError] = useState("")

    useEffect(() => {
        if (imageUploadMode === "url") {
            const img = new Image()
            img.src = photoInput
            img.onload = () => setDisplayPhoto(photoInput)
            img.onerror = () => setDisplayPhoto(defaultImageUrl)
        }
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



    const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        setLoadingImage(true)
        const file = event.target.files?.[0]

        if (!file) return setLoadingImage(false)

        const imageUrl = await uploadCloudinary(file)
        setDisplayPhoto(imageUrl)
        setLoadingImage(false)
    }

    const handleUrlPhoto = (event: ChangeEvent<HTMLInputElement>) => {

      

        if (imageUploadMode == "ai" && event.target.value.length > 25) return

        setPhotoInput(event.target.value)



    }

    useEffect(() => {
        setDisplayPhoto(defaultImageUrl)
        setPhotoInput("")
    }, [imageUploadMode])

    const handleBackTest = async () => {
        setLoadingImage(true)
        try {

            const response = await fetch("http://localhost:3001/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: photoInput })
            })

            const data = await response.json()
            if (!data.success) {
                const resumeError = data.error.split(".")[1]
                setAiError(resumeError)
                setAiErrorShow(true)
                return
            }

            setDisplayPhoto(data.imageUrl)
        } catch (error) {
            console.log("Connection error with server")
        } finally {
       

        setLoadingImage(false)
    }

    }

  
    return (
        <div className="relative">
            <div className="p-5 bg-slate-400 text-slate-700">
                <h3 className="text-3xl">Create contact</h3></div>
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-5 min-w-90 max-w-110 xl:max-w-160 p-5  max-h-150 overflow-y-auto  ">
                <div className="col-span-12">
                    <div className="flex flex-col items-center justify-center">
                        <NavImageMode setImageUploadMode={setImageUploadMode} imageUploadMode={imageUploadMode} />

                        <div className="flex justify-center w-full bg-orange-300 rounded-2xl h-60 ">

                            <div className="flex flex-col gap-5 w-50 pt-4 pb-2">
                                {/* Vista pestaña URL */}
                                <div className={`${imageUploadMode === "url" ? "flex" : "hidden"} transition duration-1200 flex flex-col gap-3 items-center`}>
                                    <img className="w-3/4 h-40 object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                    <div>
                                        <input placeholder="Enter your image url" className="border-1 rounded-xl border-slate-500 w-full outline-slate-500 h-10 pl-4 py-2 bg-slate-50 text-slate-500" value={photoInput} onChange={handleUrlPhoto} type="text"></input>
                                    </div>
                                </div>


                                {/* Vista pestaña Upload */}
                                <div className={`${imageUploadMode === "upload" ? "flex" : "hidden"} flex flex-col gap-3 justify-center items-center `}>

                                    <div className="relative w-full flex justify-center">
                                        <img className="w-3/4 h-40 object-cover rounded-xl" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                        <div className={`${loadingImage ? "absolute" : "hidden"} transition duration-1200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white/70 px-4 py-2 rounded-xl  `}>Loading...</div>
                                    </div>

                                    <label className="px-4 py-2 bg-slate-600 rounded-xl text-slate-100 hover:cursor-pointer
                                        hover:bg-slate-500 active:bg-slate-600
                                        " htmlFor="uploadInput">Select your image</label>
                                    <input onChange={handleUploadImage} className="hidden" id="uploadInput" type="file"></input>


                                </div>


                                {/* Vista pestaña AI */}
                                <div className={`${imageUploadMode === "ai" ? "flex" : "hidden"} transition duration-1200 flex flex-col items-center gap-3 `}>
                                    <div className="relative flex justify-center overflow-hidden  w-3/4 bg-pink-300 rounded-xl ">
                                        <div className={`${loadingImage ? "opacity-100" : "opacity-0"} transition duration-1000 absolute inset-0 bg-white/70 flex justify-center items-center`}>
                                            <p className="text-md text-slate-900 animate-heartbeat text-center">Generating image...</p>
                                        </div>
                                        <img className="w-full h-40 object-cover" src={displayPhoto || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152229/Imagen_ejemplo_contacto_h0ymej.png"} />
                                    </div>
                                    <div className="text-center">
                                        <div className="flex">
                                            <input placeholder="Enter 5~25 characters" className="border-1 border-slate-300 bg-slate-50 rounded-l-xl outline-slate-700  w-full h-10 px-2 text-slate-800" value={photoInput} onChange={handleUrlPhoto} type="text"></input>
                                            <button title="Generate image" onClick={() => {
                                                if (photoInput.length < 5) {
                                                    setAiError("Enter at least 5 characters")
                                                    setAiErrorShow(true)
                                                    return
                                                }
                                                handleBackTest()

                                            }} type="button" className="px-2 rounded-r-xl bg-slate-600 text-slate-100 hover:cursor-pointer
                                        hover:bg-slate-500 active:bg-slate-600
                                        ">
                                                <i className="fa-solid fa-pen-clip text-sm"></i>
                                            </button>
                                        </div>


                                        <div className={`${aiErrorShow ? "relative" : "hidden"} px-5 py-2 rounded-xl bg-red-200 border-1 border-red-400 text-red-400 text-sm`}>{aiError}
                                            <div onClick={() => setAiErrorShow(false)} className="absolute top-0 right-2 hover:cursor-pointer">x</div>
                                        </div>
                                    </div>
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
