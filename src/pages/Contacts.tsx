import { useEffect, useMemo, useState, type ChangeEvent } from "react"
import { useContactReducer } from "../hooks/useContactReducer"
import { Link, useNavigate } from "react-router"
import { Card } from "../components/Card"
import { InteractiveButton } from "../components/InteractiveButton"
import { ContactCard } from "../components/Contacts/ContactCard"
import { SearchInput } from "../components/SearchInput"


const PAGE_SIZE = 5

export const Contacts = () => {

    const { store, openModal } = useContactReducer()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState("")
        const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
            setSearchInput(event.target.value)

        }

    useEffect(() => {
        if (!store?.slug) {
            navigate("/agendas")
        }
    }, [])



    const filteredContacts = useMemo(()=>{

        if(!store?.contacts) return []
        
        if(searchInput.trim() == "") return store?.contacts

        return store?.contacts.filter((contact)=>{
            return contact.name.trim().toLowerCase().startsWith(searchInput.trim().toLowerCase())
        })


    },[store?.contacts, searchInput])


    const totalPages = Math.ceil(filteredContacts.length / PAGE_SIZE)

    const contacts = useMemo(()=>{
        const start = (page - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE

        return filteredContacts.slice(start, end)
    },[filteredContacts, page])

    const disabled = page >= totalPages


    return (
        <>
            <div className="pb-15 w-full px-2 sm:px-10">
                <div className="flex flex-col  gap-2 hover:cursor-default ">
                    <div className="flex">
                        <div className="p-2">
                            <button onClick={() => navigate(-1)} className="pr-6 pl-3 py-2 shadow-md shadow-slate-400 bg-slate-400  text-slate-50 rounded-full hover:cursor-pointer hover:bg-slate-300 active:bg-slate-500"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>
                        </div>
                    </div>
                    <div className="flex justify-center p-3">
                        <h2 className="text-slate-900 text-3xl sm:text-5xl text-center">
                            {store?.slug}'s Contacts
                        </h2>
                    </div>
                  <SearchInput onChange={handleSearchInput} searchInput={searchInput} setSearchInput={setSearchInput} themeDark={false}/>
                    <div className=" flex flex-col justify-between p-3 pb-15 rounded-4xl bg-slate-700 shadow-xl shadow-slate-400 ">
                        <div className="grid grid-cols-12 lg:grid-rows-3 gap-y-15 sm:gap-x-10 min-h-[750px] p-10 ">
                            
                            <div className={`flex flex-col items-center justify-center col-span-12 ${contacts.length === 0 ? "row-span-full gap-6" : "lg:col-span-6"}`}>
                               {contacts.length === 0 && <p className="text-slate-50 text-xl text-center max-w-100">No contacts found. Create one below to get started.</p>}  
                                <button onClick={() => openModal({ type: "createContact" })} className="min-w-68 max-w-68 h-45 hover:cursor-pointer transform hover:scale-110 transition hover:duration-500 hover:bg-slate-300 active:bg-slate-100 bg-slate-200 rounded-2xl">
                                    <i className="fa-solid fa-plus text-5xl text-slate-50"></i>
                                </button>
                            </div>
                            {
                                Array.isArray(contacts) && store?.slug && contacts.map((contact) => {
                                    return <ContactCard item={contact} agenda={store?.slug!} />
                                })
                            }

                        </div>


                        <div className="flex justify-center py-2">
                            <div className="w-35 flex justify-between text-slate-50 ">
                                <button type="button" disabled={page == 1} onClick={(e) => {
                                    e.preventDefault()
                                    setPage(prev => prev > 1 ? prev - 1 : prev)
                                }} className={`${page == 1 ? "opacity-50" : "transformation hover:scale-110 hover:text-slate-200 hover:cursor-pointer transition hover:duration-300"} text-slate-500 text-2xl`}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button className="text-xl" type="button">
                                    {page}
                                </button>
                                <button disabled={disabled} type="button" onClick={(e) => {
                                    e.preventDefault()
                                    setPage(prev => prev + 1)
                                }} className={`text-slate-500 text-2xl ${disabled ?
                                    "opacity-50"
                                    :
                                    "transformation hover:scale-110 hover:text-slate-200 hover:cursor-pointer transition hover:duration-300"
                                    }`}>
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
