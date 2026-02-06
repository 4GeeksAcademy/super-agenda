import { useEffect, useState } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { Card } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"
import { ContactCard } from "../components/Contacts/ContactCard"

export const Contacts = () => {

    const { store, openModal } = useContactReducer()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!store?.slug) {
            navigate("/agendas")
        }
    }, [])



    return (
        <>
            <div className="px-3 pb-25">
                <div className="flex flex-col gap-2 hover:cursor-default ">
                    <div className="flex">
                        <div className="p-2">
                            <button onClick={() => navigate(-1)} className="pr-6 pl-3 py-2 shadow-md shadow-slate-400 bg-slate-200 rounded-full hover:cursor-pointer hover:bg-slate-100 active:bg-slate-300"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>
                        </div>
                    </div>
                    <div className="flex justify-center p-3">
                        <h2 className="text-slate-900 text-3xl sm:text-5xl text-center">
                            {store?.slug}'s Contacts
                        </h2>
                    </div>
                    <div className="flex flex-col justify-between gap-13 p-3 pb-15 rounded-xl bg-slate-700 h-210 shadow-xl shadow-slate-400">
                        <ul className="grid grid-cols-12 gap-y-10 md:gap-10 p-10 ">

                            {
                                Array.isArray(store?.contacts) && store.slug && store.contacts.map((contact, index) => {
                                    return <ContactCard item={contact} agenda={store?.slug!} />
                                })
                            }

                            {/* <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594" />
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594" />
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594" />
                            <ContactCard name="Facundo" email="facu@gmail.com" address="Calle Buena Vibra 25" phone="095097594" /> */}
                            <div className="col-span-12 lg:col-span-6 lg:block flex items-center justify-center ">
                                <button onClick={() => openModal({ type: "createContact" })} className="w-68 h-45 hover:cursor-pointer transform hover:scale-110 transition hover:duration-500 hover:bg-slate-300 active:bg-slate-100 bg-slate-200 rounded-2xl">
                                    <i className="fa-solid fa-plus text-5xl text-slate-50"></i>
                                </button>
                            </div>
                        </ul>
                        <div className="bg-red-200 flex justify-center py-2">
                            <div className="w-35 flex justify-between bg-orange-200">
                                <button disabled={page == 1} onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)} className={`${page == 1 && "opacity-0"}`}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button className="">
                                    {page}
                                </button>
                                <button onClick={() => setPage(prev => prev + 1)} className="">
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
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