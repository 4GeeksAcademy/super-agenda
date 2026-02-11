import { useEffect, useState, type ChangeEvent, type Dispatch } from "react"
import type { FormDataType } from "../../hooks/useContactReducer/store"

type FieldCreateContactType = {
    field: keyof ErrorsType
    created: boolean
    submitCount: number

    setFormData: Dispatch<React.SetStateAction<FormDataType>>
    formData: FormDataType
    setSubmitCount: Dispatch<React.SetStateAction<number>>
}



type ErrorsType = {
    name: boolean
    email: boolean
    phone: boolean
    address: boolean
}



export const FieldCreateContact = ({ field, created, submitCount, setSubmitCount, setFormData, formData }: FieldCreateContactType) => {

    const capitalized = field[0].toUpperCase() + field.slice(1)
    const [error, setError] = useState("")
    const [fieldValue, setFieldValue] = useState("")
    const [textRequired, setTextRequired] = useState("Please enter at least 6 characters")
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
        setFieldValue(value)
        
    }

useEffect(() => {
    // if (submitCount === 0) {
    //     setError("")
    //     return
    // }

    // if (fieldValue.trim().length < 6) {
    //     setError("Please enter at least 6 characters")
    //     return
    // }

    // if (field === "email") {
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    //     setError(
    //         emailRegex.test(fieldValue)
    //             ? ""
    //             : "Please enter a valid email address (e.g. user@domain.com)"
    //     )
    //     return
    // }

    // setError("")
}, [submitCount, fieldValue, field])



    return (<>
        <label htmlFor={field}>{capitalized}</label>
        <div className="relative w-full">
            <input
                className={`pl-3  border-1 rounded-xl h-10 ${error ? "bg-red-200 text-red-700" :
                    "bg-emerald-100 text-emerald-700"
                    } w-full `}
                // className={` 
                // ${errors[field] ?
                //         "focus:outline-red-300 bg-red-100 text-red-400 border-red-300 "
                //         : "focus:outline-slate-400 bg-slate-100 text-slate-500 border-slate-300 "
                //     } 
                //     border-1  h-9 rounded-xl px-3 
                //     `}
                id={field} disabled={created}
                name={field}
                onChange={handleChange} />
            {
                error &&
                <div className="absolute inset-y-0 right-1 flex items-center">
                    <i className="text-red-800 fa-solid fa-exclamation"></i>
                </div>
            }
        </div>
   

            <div className={`${error ? "text-red-800" : "text-emerald-400"} mb-2 w-full  mt-1 py-1 text-center rounded-xl min-h-9`}>
                {error || textRequired}
            </div>
        
    </>)
}