import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"

export const ModalNotification= ({closeModal}: ModalModelType)=>{
    return(
        <>
        <h2>Hola, soy un modal de notificacion</h2>
        <InteractiveButton color="red" text="Close modal" onClick={()=> closeModal()} />
        </>
    )
}
