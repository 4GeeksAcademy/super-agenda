import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Modal } from "../components/Modal"
import { useContactReducer } from "../hooks/useContactReducer"
import { type TypesType } from "../components/Modal"

export const Layout = () =>{

    const {store} = useContactReducer()

    const isModal = store?.isModal
    const modalType = store?.modalType

    return (
        <>
        { isModal && modalType && <Modal type={modalType as keyof TypesType}/>}
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}