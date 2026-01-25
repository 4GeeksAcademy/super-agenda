import { useContactReducer } from "../hooks/useContactReducer"
import { ModalCreateContact } from "./ModalModels.tsx/ModalCreateContact";
import { ModalCreateUser } from "./ModalModels.tsx/ModalCreateUser"
import { ModalDeleteUser } from "./ModalModels.tsx/ModalDeleteUser";
import { ModalLoading } from "./ModalModels.tsx/ModalLoading"
import { ModalUpdateContact } from "./ModalModels.tsx/ModalUpdateContact";




type ModalType = {
    type: keyof TypesType
}



export type TypesType = {
    createUser: string
    loading: string
    deleteUser: string
    createContact: string
    updateContact:string
}



export const Modal = (props: ModalType) => {


    const { closeModal } = useContactReducer()
    const choosedModal = () => {
        switch (props.type) {
            case "createUser":
                return <ModalCreateUser closeModal={closeModal} />

            case "loading":
                return <ModalLoading closeModal={closeModal} />

            case "deleteUser":
                return <ModalDeleteUser closeModal={closeModal} />

            case "createContact":
               
                return <ModalCreateContact closeModal={closeModal}/>
            case "updateContact":
               
                return <ModalUpdateContact closeModal={closeModal}/>
            default:
                return null
        }
    }


    return (
        <>
            <div onClick={() => closeModal()} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-10 "></div>
            <div className="fixed  top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg z-20 ">
                {
                    choosedModal()
                }
            </div>

        </>
    )
}