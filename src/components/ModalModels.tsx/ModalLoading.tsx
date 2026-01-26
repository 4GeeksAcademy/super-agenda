import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"

export const ModalLoading = ({closeModal}: ModalModelType)=>{
    return(
        <>
        <h2>Hola, soy un modal de carga</h2>
        <InteractiveButton tone="normal" color="red" text="Close modal" onClick={()=> closeModal()} />
        </>
    )
}