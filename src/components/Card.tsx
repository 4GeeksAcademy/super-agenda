import Swal from "sweetalert2"
import { deleteContact } from "../services/userServices"
import { saveAgenda } from "../pages/User"
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

    const {dispatch} = useContactReducer()

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            html:`You are about to delete <b>${name.toUpperCase()}</b>'s contact. <br/>Do you want to proceed?`,
            confirmButtonText: "Delete",
            confirmButtonColor: "grey",
            showDenyButton: true,
            denyButtonText: "Cancel"
        }).then((resp)=>{
            if(resp.isConfirmed){
                deleteContact(agenda, id!).then((resp)=>{
                    if(resp){
                        saveAgenda(agenda, dispatch)
                    }
                })
            }
        })
    }

    return(
        <div>
            <p className="text-4xl">{name.toUpperCase()}</p>
            <Link to={`/${agenda}/contact-form`} state={{item}}>
            <i className="fa-solid fa-pen"/>
            </Link>
            <i onClick={handleDelete} className="text-red-500 hover:cursor-pointer fa-solid fa-xmark"/>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
        </div>
    )
}