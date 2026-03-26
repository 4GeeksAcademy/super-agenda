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

    const btn = "hover:cursor-pointer text-xl mt-5 px-5 py-2 rounded-2xl transform hover:scale-105 transition hover:duration-300"
    const deleteBtn = "bg-orange-600 text-orange-100 hover:bg-orange-500 active:bg-orange-700"
    const cancelBtn = "text-slate-500 hover:bg-slate-100 active:bg-slate-50"

    return (
        <div className="min-w-80 md:min-w-100 ">
            <div className="relative">
                <div className="absolute right-0 top-0 p-2">
                    <button className="hover:text-orange-700 text-orange-800 hover:cursor-pointer rounded-lg" onClick={() => closeModal()}>
                        <i className="text-2xl fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="p-3 bg-orange-400 text-orange-800">
                    <p className="text-3xl">Confirm action</p>
                </div>
            </div>
            <div className="p-7 pb-2">
                <p className="text-lg md:text-lg my-3 text-slate-800">
                    You are about to delete <b>{store?.slug}</b>'s contact.<br />
                    Want to proceed?
                </p>
            </div>
                <div className="flex justify-center sm:justify-end gap-3 pb-5">
                    <button className={`${btn} ${cancelBtn}`} onClick={() => closeModal()}>Cancel</button>
                    <button className={`${btn} ${deleteBtn} mr-3`} onClick={handleDeleteContact}>Confirm</button>
                </div>
        </div>
    )
}