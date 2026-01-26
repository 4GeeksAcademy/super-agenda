import { useNavigate } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { deleteAgenda } from "../../services/agendaServices"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"



export const ModalDeleteUser= ({closeModal}: ModalModelType)=>{

    const {store, loadAgendas, resetSlugAndContacts} = useContactReducer()
    const navigate = useNavigate()
    

    const handleDeleteAgendaBtn = async()=>{
    if(store?.userToDelete){
       const deletedAgenda = await deleteAgenda(store?.userToDelete)

       if(deletedAgenda){
        loadAgendas()
        resetSlugAndContacts()
        closeModal()
        navigate("/")
       }

    }
    }


    return(
        <>
        <h2>Do you really want to delete <b>{store?.userToDelete}</b>'s agenda?</h2>
        {store?.userToDelete && <>
        <InteractiveButton tone="normal" onClick={handleDeleteAgendaBtn}color="red" text="Confirm"></InteractiveButton>
        <InteractiveButton tone="normal" color="slate" text="Cancel" onClick={()=> closeModal()} />
        </>
        }
        </>
    )
}
