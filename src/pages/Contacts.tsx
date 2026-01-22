import { useEffect } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { useNavigate } from "react-router"
import { Card } from "../components/Card"

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
        <ul>
        {
            Array.isArray(store?.contacts)  && store.contacts.map((contact)=>{
                console.log(contact)
                return <li><Card item={contact}/></li>
            })
        }
        </ul>
        </>
    )
}