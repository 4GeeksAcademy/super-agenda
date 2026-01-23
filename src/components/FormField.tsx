import type { ChangeEvent } from "react"
import type { ItemType } from "./Card"

 type FormFieldType = {
    handleChange: (event: ChangeEvent<HTMLInputElement>)=> void
    field: keyof ItemType
    formData?: ItemType 
    userField?: string
 }

export const fields: (keyof ItemType)[] = ["name", "phone", "email", "address",]


export const FormField = ({field, handleChange, formData, userField}:FormFieldType) =>{

    console.log(fields.includes(field))

    const value = fields.includes(field) ? formData?.[field] : userField

    const fieldCapitalized = field[0].toUpperCase() + field.slice(1)

    return(
        <>
         <label htmlFor="name">{fieldCapitalized}</label>
        <input onChange={handleChange} value={value} id={field} name={field} className="border-1 "></input>
        </>
    )
}