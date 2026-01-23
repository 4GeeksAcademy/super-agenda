import { useContactReducer } from "../hooks/useContactReducer"
import { InteractiveButton } from "./InteractiveButton"

type ModalType = {
    type: keyof TypesType
    title: string
    text: string
}

type TypesType = {
    form: string
    loading: string
    notification: string
}

// {type, title,text }:ModalType
export const Modal = ({type, title, text}: ModalType)=>{
    
    

    const {closeModal} = useContactReducer()


    
return (
    <>
     <div onClick={()=> closeModal()} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-10 "></div>
     <div className="fixed  top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg z-20 ">
     <h2>Hola, soy un modal</h2>
     <InteractiveButton color="red" text="Close modal" onClick={()=> closeModal()} />
     </div>
     
    </>
)
}