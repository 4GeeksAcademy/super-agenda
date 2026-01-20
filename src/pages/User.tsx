import { useEffect } from "react"
import { getAllAgendas } from "../services/userServices"

export const User = () => {

    const getAgendas = async() =>{
        console.log(await getAllAgendas())
    }

    useEffect(()=>{

        getAgendas()
        
    },[])

    return (
        <div>
            For a fresh start, you need to choose one of us registered users
            <ul>
                <li>User 1</li>
                <li>User 2</li>
            </ul>
        </div>
    )
}