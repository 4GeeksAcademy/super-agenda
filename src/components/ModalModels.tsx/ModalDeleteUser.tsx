import { useContactReducer } from "../../hooks/useContactReducer"
import { deleteAgenda } from "../../services/agendaServices"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"



export const ModalDeleteUser= ({closeModal}: ModalModelType)=>{

    const {store, loadAgendas} = useContactReducer()

    

    const handleDeleteAgendaBtn = async()=>{
    if(store?.userToDelete){
       const deletedAgenda = await deleteAgenda(store?.userToDelete)

       if(deletedAgenda){
        loadAgendas()
        closeModal()
       }

    }
    }


    return(
        <>
        <h2>Do you really want to delete <b>{store?.userToDelete}</b>'s agenda?</h2>
        {store?.userToDelete && <>
        <InteractiveButton onClick={handleDeleteAgendaBtn}color="red" text="Confirm"></InteractiveButton>
        <InteractiveButton color="slate" text="Cancel" onClick={()=> closeModal()} />
        </>
        }
        </>
    )
}
