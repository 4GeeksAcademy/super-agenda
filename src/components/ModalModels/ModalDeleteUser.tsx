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
            }

        }
    }


    const btn =
        "hover:cursor-pointer text-xl mt-5 px-5 py-2 rounded-2xl transform hover:scale-105 transition hover:duration-300";

    const deleteBtn =
        "bg-red-500 text-red-100 hover:bg-red-400 active:bg-red-600";

    const cancelBtn =
        "text-slate-500 hover:bg-slate-100 active:bg-slate-50";

    return (
        <div className="min-w-80 md:min-w-100 ">
            <div className="relative">
                <div className="absolute right-0 top-0 p-2">
                    <button
                        className="hover:text-orange-700 text-orange-800 hover:cursor-pointer rounded-lg"
                        onClick={() => closeModal()}
                    >
                        <i className="text-2xl fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="p-3 bg-orange-400 text-orange-800">
                    <p className="text-3xl">Confirm action</p>
                </div>
            </div>

            <div className="p-7 pb-2">
                <p className="text-lg md:text-lg my-3 text-slate-800">
                    You are about to delete <b>{store?.userToDelete}</b>'s agenda.
                    <br />
                    Want to proceed?
                </p>
            </div>

            <div className="flex justify-center sm:justify-end gap-3 pb-5">
                <button
                    className={`${btn} ${cancelBtn}`}
                    onClick={() => closeModal()}
                >
                    Cancel
                </button>

                <button
                    className={`${btn} ${deleteBtn} mr-3`}
                    onClick={handleDeleteAgendaBtn}
                >
                    Confirm
                </button>
            </div>
        </div>
    );

}
