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

    const btn = "text-xl mt-5 px-5 py-2 rounded-2xl transform hover:scale-110 transition hover:duration-300"
    const deleteBtn = "bg-red-500 text-red-100 hover:bg-red-400 active:bg-red-600"
    const cancelBtn = "bg-slate-500 text-slate-100 hover:bg-slate-400 active:bg-slate-600"

    return (
        <div className="min-w-70 md:min-w-56 min-h-74 text-center">
            <div className="text-right">
                <button className="hover:bg-slate-200 hover:cursor-pointer p-2 rounded-lg" onClick={() => closeModal()}>
                    <i className="text-3xl fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="flex justify-center">
                <img className="h-30 md:h-40" src="https://images.icon-icons.com/2550/PNG/512/emoji_sad_icon_152623.png" />
            </div>
            <div className="mt-4 mb-5">
                <p className="text-lg md:text-2xl">
                    You are about to delete <b>{store?.slug}</b>'s contact.<br/>
                    Want to proceed?
                </p>
            </div>
            <div className="flex border-t-1 border-slate-400 justify-evenly">
                <button className={`${btn} ${deleteBtn} mr-3`} onClick={handleDeleteContact}>Sure</button>
                <button className={`${btn} ${cancelBtn}`} onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}