import { useEffect, useState, type ChangeEvent, type Dispatch } from "react"
import type { FormDataType } from "../../hooks/useContactReducer/store"

type FieldCreateContactType = {
    field: keyof ErrorsType
    created: boolean
    sended: boolean

    setFormData: Dispatch<React.SetStateAction<FormDataType>>
    formData: FormDataType
    setSended: Dispatch<React.SetStateAction<boolean>>
}



type ErrorsType = {
    name: boolean
    email: boolean
    phone: boolean
    address: boolean
}



export const FieldCreateContact = ({ field, created, sended, setSended, setFormData, formData }: FieldCreateContactType) => {

    const capitalized = field[0].toUpperCase() + field.slice(1)
    const [error, setError] = useState("")
    const [fieldValue, setFieldValue] = useState("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
        setFieldValue(value)

    }

    useEffect(() => {
        if (sended && fieldValue.trim() === "") {
            setError("Please enter at least 6 characters")
        } else {
            setError("")
        }
    }, [sended, fieldValue])



    //  if(key === "email"){

    //                 const emailRegex =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    //                 if(!emailRegex.test(value)){
    //                     alert("Please enter a valid email address (e.g. user@domain.com)")
    //                 }
    //             }


    return (<>
        <label htmlFor={field}>{capitalized}</label>
        <div className="relative w-full">

            <input
                className={` border-1 rounded-xl h-9 ${error ? "bg-red-200 text-red-800" :
                    "bg-slate-300 text-slate-800"
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
        {error &&

            <div className="mb-4 w-full bg-red-300 text-red-800 mt-1 py-1 text-center rounded-xl">{error}</div>
        }
    </>)
}