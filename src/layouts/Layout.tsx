import { Outlet, useLocation } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Modal } from "../components/Modal"
import { useContactReducer } from "../hooks/useContactReducer"
import { type TypesType } from "../components/Modal"

export const Layout = () => {

    const { store } = useContactReducer()

    const isModal = store?.isModal
    const modalType = store?.modalType
    const location = useLocation()

    const exclusiveSize = location.pathname.trim()== "/" || location.pathname.trim() == "/agendas"
    const bgColor = location.pathname.trim() == "/about-me" || location.pathname.trim().includes("/contacts") || location.pathname.trim() == "/"

    console.log(bgColor)
   

    return (
        <div className={`min-h-screen flex flex-col ${bgColor ? "bg-slate-50" : "bg-slate-900"}`}>
            {isModal && modalType && <Modal type={modalType as keyof TypesType} />}
            <Navbar />
            <div className={`flex-1 ${exclusiveSize ?"": " mx-auto w-full sm:w-[600px] lg:w-[700px] my-5 "}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}