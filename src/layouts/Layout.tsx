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
   

    return (
        <div className="min-h-screen flex flex-col">
            {isModal && modalType && <Modal type={modalType as keyof TypesType} />}
            <Navbar />
            <div className={`flex-1 ${exclusiveSize ?"": " mx-auto w-full sm:w-[600px] lg:w-[700px]  my-5"}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}