import type { ChangeEvent, Dispatch } from "react"

type FieldCreateContactType = {
    field: keyof ErrorsType
    errors: ErrorsType
    created: boolean
    sended: boolean
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    setFormData: Dispatch<React.SetStateAction<T>>
    formData: 
}


type ErrorsType = {
    name: boolean
    email: boolean
    phone: boolean
    address: boolean
}



export const FieldCreateContact = ({ field, errors, created, sended,setFormData, formData }: FieldCreateContactType) => {

    const capitalized = field[0].toUpperCase() + field.slice(1)


       const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const name = event.target.name
        const value = event.target.value

        setFormData({ ...formData, [name]: value })
        setErrors(prev => {
            return ({ ...prev, [name]: value.trim().length < 6 })
        })
    }

    if(field === "address"){
        console.log("campo de address")
    }

    return (<>
        <label htmlFor={field}>{capitalized}</label>
        <input className={` ${errors[field] ?
            "focus:outline-red-300 bg-red-100 text-red-400 border-red-300 "
            : "focus:outline-slate-400 bg-slate-100 text-slate-500 border-slate-300 "
            } border-1  h-9 rounded-xl px-3 `}
            id={field} disabled={created}
            name={field}
            onChange={handleChange} />
            <div className="mb-4 w-full bg-red-300 text-red-800 mt-2 py-1 text-center rounded-xl">Error</div>
    </>)
}