import { useEffect } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { Card } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"

export const Contacts= () =>{

    const {store, openModal} = useContactReducer()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!store?.slug){
            navigate("/user")
        }
    },[])


    return(
        <>
      
        <InteractiveButton onClick={()=> openModal({type:"createContact"})} text="+" color="red" />
     
        <ul>
        {
            Array.isArray(store?.contacts)  && store.slug && store.contacts.map((contact, index)=>{
                return <li key={index} ><Card agenda={store.slug!} item={contact}/></li>
            })
        }
        </ul>
        </>
    )
}