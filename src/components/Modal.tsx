import { useContactReducer } from "../hooks/useContactReducer"
import { InteractiveButton } from "./InteractiveButton"
import { ModalCreateUser, ModalLoading, ModalNotification } from "./Modal/ModalModels"

type ModalType = {
    type: keyof TypesType
}

export type TypesType = {
    createUser: string
    loading: string
    notification: string
}


export const Modal = ({type}: ModalType)=>{


    const {closeModal} = useContactReducer()
    
    const choosedModal = ()=>{
       switch (type) {
        case "createUser":
            
            return  <ModalCreateUser closeModal={closeModal}/>
       
        case "loading":
            return <ModalLoading closeModal={closeModal}/>
        
        case "notification":
            return <ModalNotification closeModal={closeModal}/>
        default:
            return null
       }
    }

    
return (
    <>
     <div onClick={()=> closeModal()} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-10 "></div>
     <div className="fixed  top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg z-20 ">
    {
        choosedModal()
    }
     </div>
     
    </>
)
}