import { useEffect, useState, type ChangeEvent } from "react"
import { useContactReducer } from "../../hooks/useContactReducer"

type InputFormCreateContactType = {
    field:string
}

export const InputFormCreateContact = ({field}:InputFormCreateContactType)=>{


    const {store, loadAgenda} = useContactReducer()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [inputValue, setInputValue] = useState("")
    const title = field[0].toUpperCase() + field.slice(1)

    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const placeholder = field == "email"? "example@example.com" : field == "name"? "John Smith" : field == "phone" ? "+34695241321" :  "123 Elm St"

    


    useEffect(()=>{
        if(inputValue.length >= 0 && inputValue.length <5){
            setError(true)
            setErrorMessage("Introduce at least 5 characters")
            return
        }else if(field == "email"){
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
            if(!emailRegex.test(inputValue)){
                setError(true)
                setErrorMessage("Please enter a valid email address (e.g. user@domain.com)")
                return
            }
            setError(false)
        }else if(field == "name"){
            if(!store) throw new Error("Store was not found")
                if(store.slug){
                    loadAgenda(store?.slug)
                }
            if(store.contacts){
                for(let contact of store?.contacts){
                    const contactName = contact.name.replace(" ", "").toLowerCase()
                    const newName = inputValue.replace(" ", "").toLowerCase()
                    
                    if(contactName === newName){
                       setError(true)
                       setErrorMessage("This contact already exist") 
                       return
                    }
                     
                }
            }
            setError(false)
        }else{
            setError(false)
        }
    },[inputValue])

    return(
        <>
        <label htmlFor={field}>{title}</label>
        <input data-error={error} placeholder={placeholder} onChange={handleChange} id={field} name={field} className="border-1 rounded-lg" type="text"/>
        {error && (
            <p className={`text-${inputValue.length > 0 ? "red": "slate"}-400`}>{errorMessage}</p>
        )}
        </>
    )
}