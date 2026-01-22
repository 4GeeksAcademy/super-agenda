import { useEffect } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { Card } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"

export const Contacts= () =>{

    const {store} = useContactReducer()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!store?.slug){
            navigate("/user")
        }
    },[])


    return(
        <>
        <Link to={`/${store?.slug}/contact-form`} >
        <InteractiveButton text="+" color="red" />
        </Link>
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