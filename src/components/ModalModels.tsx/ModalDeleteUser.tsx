import { useNavigate } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { deleteAgenda } from "../../services/agendaServices"
import { InteractiveButton } from "../InteractiveButton"
import type { ModalModelType } from "./ModalTypes"



export const ModalDeleteUser = ({ closeModal }: ModalModelType) => {

    const { store, loadAgendas, resetSlugAndContacts } = useContactReducer()
    const navigate = useNavigate()


    const handleDeleteAgendaBtn = async () => {
        if (store?.userToDelete) {
            const deletedAgenda = await deleteAgenda(store?.userToDelete)

            if (deletedAgenda) {
                loadAgendas()
                resetSlugAndContacts()
                closeModal()
                navigate("/")
            }

        }
    }
    const btnClass = "py-2 rounded-2xl hover:cursor-pointer transform hover:scale-105 transition duration-300"
    const deleteClasses = "hover:bg-red-400 active:bg-red-600 text-red-100  bg-red-500 px-4"
    const cancelClasses = "hover:bg-slate-300 active:bg-slate-500 text-slate-100  bg-slate-400 px-4"

    return (
        <div className="h-64 flex flex-col justify-between">
            <div className="flex justify-center">
                <img className="w-30" src="https://cdn-icons-png.flaticon.com/512/4989/4989793.png" />
            </div>
            <div className="text-center bg-red-200 py-2 md:px-2 rounded-xl text-red-900">
                <h2 className="text-sm md:text-lg">Do you really want to delete <b>{store?.userToDelete}</b>'s agenda?</h2>
            </div>
            <div className="flex justify-center ">
                <div className="w-full flex justify-evenly">

                <button className={`${btnClass} ${deleteClasses} mr-4`} onClick={handleDeleteAgendaBtn}>Confirm</button>
                <button className={`${btnClass} ${cancelClasses}`}  onClick={() => closeModal()} >Cancel</button>
                </div>
            </div>
        </div>
    )
}
