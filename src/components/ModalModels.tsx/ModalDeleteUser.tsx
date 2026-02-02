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
    const btnClass = "text-xl mt-5 py-2 rounded-2xl hover:cursor-pointer transform hover:scale-105 transition duration-300"
    const deleteClasses = "hover:bg-red-400 active:bg-red-600 text-red-100  bg-red-500 px-4"
    const cancelClasses = "hover:bg-slate-300 active:bg-slate-500 text-slate-100  bg-slate-400 px-4"

    return (
        <div className="min-h-64 min-w-56 flex flex-col justify-between">
            <div className="text-right">
            <button className="hover:bg-slate-200 hover:cursor-pointer p-2 rounded-lg" onClick={() => closeModal()}>
                    <i className="text-3xl fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="flex justify-center">
                <img className="w-20 md:w-30" src="https://cdn-icons-png.flaticon.com/512/4989/4989793.png" />
            </div>
            <div className="text-center mt-5 mb-7  py-2 md:px-2 ">
                <h2 className="text-lg md:text-xl">You are about to delete <b>{store?.userToDelete}</b>'s agenda <br/>
                Want to proceed?
                </h2>
            </div>
            <div className="flex justify-center border-t-1 border-slate-400 ">
                <div className="w-full flex justify-evenly">

                <button className={`${btnClass} ${deleteClasses} mr-4`} onClick={handleDeleteAgendaBtn}>Confirm</button>
                <button className={`${btnClass} ${cancelClasses}`}  onClick={() => closeModal()} >Cancel</button>
                </div>
            </div>
        </div>
    )
}
