import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Modal } from "../components/Modal"
import { useContactReducer } from "../hooks/useContactReducer"

export const Layout = () =>{

    const {store} = useContactReducer()

    const modal = store?.modal


    return (
        <>
        { modal && <Modal/>}
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}