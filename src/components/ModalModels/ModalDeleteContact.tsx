import { useNavigate } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { deleteContact } from "../../services/contactServices"
import type { ModalModelType } from "./ModalTypes"

export const ModalDeleteContact = ({ closeModal }: ModalModelType) => {

    const { store, loadAgenda } = useContactReducer()

    const handleDeleteContact = async () => {
        if (store?.slug && store?.contactToDelete) {
            const deleted = await deleteContact(store?.slug, store?.contactToDelete)
            if (deleted) {
                loadAgenda(store?.slug)
                closeModal()
            }
        }
    }

    const btn = "text-xl mt-5 px-5 py-2 rounded-2xl transform hover:scale-105 transition hover:duration-300"
    const deleteBtn = "bg-red-500 text-red-100 hover:bg-red-400 active:bg-red-600"
    const cancelBtn = "text-slate-500 hover:bg-slate-100 active:bg-slate-50"

    return (
        <div className="min-w-80 md:min-w-100  text-center">
            <div className="relative">
                <div className="absolute right-0 top-0 p-1">
                    <button className="hover:bg-slate-200 hover:cursor-pointer p-1 rounded-lg" onClick={() => closeModal()}>
                        <i className="text-2xl fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="p-3 bg-slate-300">
                    <p className="text-3xl">Confirm action</p>
                </div>
            </div>
            <div className="p-4">
                <p className="text-lg md:text-lg my-3">
                    You are about to delete <b>{store?.slug}</b>'s contact.<br />
                    Want to proceed?
                </p>
                <div className="flex justify-center sm:justify-end gap-3">
                    <button className={`${btn} ${cancelBtn}`} onClick={() => closeModal()}>Cancel</button>
                    <button className={`${btn} ${deleteBtn} mr-3`} onClick={handleDeleteContact}>Confirm</button>
                </div>
            </div>
        </div>
    )
}