import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Modal } from "../components/Modal"
import { useContactReducer } from "../hooks/useContactReducer"
import { type TypesType } from "../components/Modal"

export const Layout = () => {

    const { store } = useContactReducer()

    const isModal = store?.isModal
    const modalType = store?.modalType

    return (
        <div className="min-h-screen flex flex-col">
            {isModal && modalType && <Modal type={modalType as keyof TypesType} />}
            <Navbar />
            <div className="flex-1 mx-auto sm:w-[640px] md:w-[750px] lg:w-[980px] xl:w-[1100px] 2xl:w-[1400px]  my-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}