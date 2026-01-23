import { useEffect, useState, type ChangeEvent } from "react"
import { fields, FormField } from "../FormField"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"
import { Form } from "react-router"

export const ModalCreateUser = ({closeModal}: ModalModelType)=>{

    const [userField, setUserField] = useState<string>("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        setUserField(event.target.value)
    }

    const handleCreateUserBtn = ()=>{

        closeModal()
    }

    useEffect(()=>{

    })
   

    return(
        <>
        <form>
           <FormField  userField={userField} handleChange={handleChange} field="name" />
        </form>
        <InteractiveButton color="red" text="Create" onClick={handleCreateUserBtn} />
        <InteractiveButton color="slate" text="Cancel" onClick={()=> closeModal()} />
        </>
    )
}
