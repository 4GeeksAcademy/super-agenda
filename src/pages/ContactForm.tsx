import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useLocation, useNavigate, useParams } from "react-router"

import { InteractiveButton } from "../components/InteractiveButton"

import { saveAgenda } from "./User"
import { useContactReducer } from "../hooks/useContactReducer"
import Swal from "sweetalert2"
import { createContact, updateContact } from "../services/contactServices"
import { fields, FormField } from "../components/FormField"


export const ContactForm= () =>{

    const location = useLocation()
    const navigate = useNavigate()

    const {agenda} = useParams()
    if(!agenda) return null

    const {dispatch, store} = useContactReducer()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address:""
    })

  

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    useEffect(()=>{
        if(location.state?.item) setFormData(location.state.item)
    },[location])


    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(location?.state?.item){
          await updateContact(agenda, location.state.item.id, formData )

        Swal.fire({
            title: "Well done!",
            text: `${agenda}'s contact, has been updated successfully`,
            confirmButtonText:"Ok"
        }).then(()=>{
            navigate(`/${agenda}/contacts`)
        })

        }else{
            await createContact(agenda, formData)

             Swal.fire({
            title: "Well done!",
            text: `${agenda}'s contact, has been added successfully`,
            confirmButtonText:"Ok"
        }).then(()=>{
            navigate(`/${agenda}/contacts`)
        })

        }
        await saveAgenda(agenda,dispatch)
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="flex flex-col ">
        {fields.map((field, index)=>{
            return  <FormField key={index} formData={formData} field={field} handleChange={handleChange}/>
        })}
        
        <InteractiveButton color="blue" text="Send"/>
        </form>
        </>
    )
}