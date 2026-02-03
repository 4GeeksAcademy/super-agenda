import type { ChangeEvent } from "react"
import type { ItemType } from "./Card"


export const fields = ["name", "phone", "email", "address"] as const

type FormFieldType = {
   handleChange: (event: ChangeEvent<HTMLInputElement>)=> void
   field: typeof fields[number]
   formData?: ItemType 
   userField?: string
   disabled?: boolean
}

export const FormField = ({field, handleChange, formData, userField, disabled}:FormFieldType) =>{

    const value = fields.includes(field) ? formData?.[field] : userField

    const fieldCapitalized = field[0].toUpperCase() + field.slice(1)

    
    
    return(
        <>
         <label htmlFor="name">{fieldCapitalized}</label>
        <input disabled={disabled ?? false} type={field == "email" ? "email": "text"} onChange={handleChange} value={value} id={field} name={field} className={`border-1 ${disabled && "bg-slate-300 text-slate-400 border-slate-500"}`} required></input>
        </>
    )
}