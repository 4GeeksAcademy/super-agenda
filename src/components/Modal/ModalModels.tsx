import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"



export const ModalCreateUser = ({closeModal}: ModalModelType)=>{
    return(
        <>
        <h2>Hola, soy un modal para crear usuario</h2>
        <InteractiveButton color="red" text="Close modal" onClick={()=> closeModal()} />
        </>
    )
}

export const ModalLoading = ({closeModal}: ModalModelType)=>{
    return(
        <>
        <h2>Hola, soy un modal de carga</h2>
        <InteractiveButton color="red" text="Close modal" onClick={()=> closeModal()} />
        </>
    )
}

export const ModalNotification= ({closeModal}: ModalModelType)=>{
    return(
        <>
        <h2>Hola, soy un modal de notificacion</h2>
        <InteractiveButton color="red" text="Close modal" onClick={()=> closeModal()} />
        </>
    )
}
