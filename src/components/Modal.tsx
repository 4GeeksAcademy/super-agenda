import { useContactReducer } from "../hooks/useContactReducer"
import { ModalCreateContact } from "./ModalModels/ModalCreateContact";
import { ModalCreateUser } from "./ModalModels/ModalCreateUser"
import { ModalDeleteContact } from "./ModalModels/ModalDeleteContact";
import { ModalDeleteUser } from "./ModalModels/ModalDeleteUser";
import { ModalLoading } from "./ModalModels/ModalLoading"
import { ModalUpdateContact } from "./ModalModels/ModalUpdateContact";




type ModalType = {
    type: keyof TypesType
}



export type TypesType = {
    createAgenda: string
    loading: string
    deleteUser: string
    deleteContact: string
    createContact: string
    updateContact:string
}



export const Modal = (props: ModalType) => {


    const { closeModal } = useContactReducer()
    const choosedModal = () => {
        switch (props.type) {
            case "createAgenda":
                return <ModalCreateUser closeModal={closeModal} />

            case "loading":
                return <ModalLoading closeModal={closeModal} />

            case "deleteUser":
                return <ModalDeleteUser closeModal={closeModal} />

            case "createContact":
               
                return <ModalCreateContact closeModal={closeModal}/>
            case "updateContact":
               
                return <ModalUpdateContact closeModal={closeModal}/>
            case "deleteContact":
                return <ModalDeleteContact closeModal={closeModal}/>
            default:
                return null
        }
    }


    return (
        <>
            <div onClick={() => closeModal()} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-10 "></div>
            <div className="fixed top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                {
                    choosedModal()
                }
            </div>

        </>
    )
}