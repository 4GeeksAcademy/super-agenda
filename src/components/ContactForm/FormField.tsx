import type { ChangeEvent } from "react"
import type { ItemType } from "../Card"

 type FormFieldType = {
    handleChange: (event: ChangeEvent<HTMLInputElement>)=> void
    field: keyof ItemType
    formData: ItemType
 }


export const FormField = ({field, handleChange, formData}:FormFieldType) =>{

    const fieldCapitalized = field[0].toUpperCase() + field.slice(1)

    return(
        <>
         <label htmlFor="name">{fieldCapitalized}</label>
        <input onChange={handleChange} value={formData[field]} id={field} name={field} className="border-1 "></input>
        </>
    )
}