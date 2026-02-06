import { useEffect } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { Card } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"
import { ContactCard } from "../components/Contacts/ContactCard"

export const Contacts = () => {

    const { store, openModal } = useContactReducer()
    const navigate = useNavigate()

    useEffect(() => {
        if (!store?.slug) {
            navigate("/agendas")
        }
    }, [])



    return (
        <>
            <div className="px-3 pt-5 pb-25 bg-orange-200">
                <div className="p-2 bg-green-200 flex flex-col gap-2 ">
                    <div className="flex bg-red-200">
                        <div className="bg-blue-200 p-2">
                            <button onClick={() => navigate(-1)} className="pr-6 pl-3 py-3 shadow-2xl shadow-slate-500 bg-slate-200 rounded-full hover:cursor-pointer hover:bg-slate-100 active:bg-slate-300"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>
                        </div>
                    </div>
                    <div className="flex justify-center p-3">
                        <h2 className="bg-orange-200 text-slate-900 text-3xl sm:text-5xl text-center">
                            {store?.slug}'s Contacts
                        </h2>
                    </div>
                    <div className="bg-orange-200">
                        <ul className="grid grid-cols-12 gap-y-10 md:gap-10 p-10 ">
                            
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594"/>
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594"/>
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594"/>
                            <div className="col-span-12 lg:col-span-6 lg:block flex items-center justify-center ">
                            <button onClick={() => openModal({ type: "createContact"})} className="w-68 h-45 hover:cursor-pointer transform hover:scale-110 transition hover:duration-500 hover:bg-slate-300 active:bg-slate-100 bg-slate-200 rounded-2xl">
                                <i className="fa-solid fa-plus text-5xl text-slate-50"></i>
                            </button>
                            </div>
                        </ul>
                    </div>
                    <div className="bg-red-200">Boton de navegacion</div>
                </div>
            </div>
        </>
    )
}
// {store?.modalFormData &&
//     <InteractiveButton tone="normal" onClick={() => openModal({ type: "createContact"})} text="+" color="red" />
// }

// <ul>
//     {
//         Array.isArray(store?.contacts) && store.slug && store.contacts.map((contact, index) => {
//             return <li key={index} ><Card agenda={store.slug!} item={contact} /></li>
//         })
//     }
// </ul>