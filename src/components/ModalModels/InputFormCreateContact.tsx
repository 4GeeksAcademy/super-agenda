import { useEffect, useState, type ChangeEvent } from "react"
import { useContactReducer } from "../../hooks/useContactReducer"

type InputFormCreateContactType = {
    name : string
    value: string
    error: string
    onChange: (name:string, value: string)=> void
}

export const InputFormCreateContact = ({name, value, error, onChange}:InputFormCreateContactType)=>{





    
    return(
        <>
        <label htmlFor={name}>{name}</label>
        <input value={value} onChange={(event)=> onChange(name, event.target.value)} id={name} name={name} className="border-1 rounded-lg" type="text"/>
        {error && (
            <p className={`text-${value.length > 0 ? "red": "slate"}-400`}>{error}</p>
        )}
        </>
    )
    // useEffect(()=>{
    //     if(inputValue.length >= 0 && inputValue.length <5){
    //         setError(true)
    //         setErrorMessage("Introduce at least 5 characters")
    //         return
    //     }else if(field == "email"){
    //         const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    //         if(!emailRegex.test(inputValue)){
    //             setError(true)
    //             setErrorMessage("Please enter a valid email address (e.g. user@domain.com)")
    //             return
    //         }
    //         setError(false)
    //     }else if(field == "name"){
    //         if(!store) throw new Error("Store was not found")
    //             if(store.slug){
    //                 loadAgenda(store?.slug)
    //             }
    //         if(store.contacts){
    //             for(let contact of store?.contacts){
    //                 const contactName = contact.name.replace(" ", "").toLowerCase()
    //                 const newName = inputValue.replace(" ", "").toLowerCase()
                    
    //                 if(contactName === newName){
    //                    setError(true)
    //                    setErrorMessage("This contact already exist") 
    //                    return
    //                 }
                     
    //             }
    //         }
    //         setError(false)
    //     }else{
    //         setError(false)
    //     }
    // },[inputValue])
}