import Swal from "sweetalert2"
import { saveAgenda } from "../pages/Agendas"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link } from "react-router"



export type ItemType = {
    name: string,
    phone: string, 
    email: string,
    address: string,
    id?: number
}


type CardType = {
    item: ItemType,
    agenda: string 
}


export const Card = ({item, item: {name, phone, email, address, id}, agenda} : CardType) =>{

    const {store, openModal} = useContactReducer()

    const handleDelete = () => {
                // deleteContact(agenda, id!).then((resp)=>{
                //     if(resp){
                //         saveAgenda(agenda, dispatch)
                //     } })
            if(id){
                openModal({type: "deleteContact", contactId: id.toString()})    
            }
    }

    const handleUpdateContact = () =>{
        if(id){
            openModal({type: "updateContact", formData: {name, phone, email, address, id}})
        }
    }

    return(
        <div>
            <p className="text-4xl">{name.toUpperCase()}</p>
          
            <i  onClick={handleUpdateContact} className="fa-solid fa-pen"/>
            
            <i onClick={handleDelete} className="text-red-500 hover:cursor-pointer fa-solid fa-xmark"/>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
        </div>
    )
}