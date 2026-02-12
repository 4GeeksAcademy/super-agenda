
type InputFormCreateContactType = {
    field:string
}

export const InputFormCreateContact = ({field}:InputFormCreateContactType)=>{

    const title = field[0].toUpperCase() + field.slice(1)

    const type = field == "email" ? "email" : "text"


    return(
        <>
        <label htmlFor={field}>{title}</label>
        <input id={field} className="border-1 rounded-lg" type={type} required/>
        </>
    )
}