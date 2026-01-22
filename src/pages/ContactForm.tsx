import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useLocation } from "react-router"
import { FormField } from "../components/ContactForm/FormField"
import type { ItemType } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"
import { createContact, updateContact } from "../components/ContactForm/utils"
import { saveAgenda } from "./User"
import { useContactReducer } from "../hooks/useContactReducer"

export const ContactForm= () =>{

    const location = useLocation()
    const agenda = location.state.agenda
    const {dispatch} = useContactReducer()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address:""
    })

    const fields: (keyof ItemType)[] = ["name", "phone", "email", "address"] 

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    useEffect(()=>{
        if(location.state?.item) setFormData(location.state.item)
    },[location])


    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(location.state.item){
            updateContact(agenda, location.state.item.id, formData )
        }else{
            // createContact()
        }
        saveAgenda(agenda,dispatch)
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="flex flex-col ">
        {fields.map((field)=>{
            return  <FormField formData={formData} field={field} handleChange={handleChange}/>
        })}
        
        <InteractiveButton color="blue" text="Send"/>
        </form>
        </>
    )
}