import { Link, useLocation } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"
import { UserBtn } from "./Navbar/UserBtn"
import { Wrapper } from "./Navbar/Wrapper"

export const Navbar = () => {

    const { store, openModal } = useContactReducer()

    const location = useLocation()


    const path = location.pathname

    const darkTheme = location.pathname.includes("agendas") || location.pathname == "/"
    
    const bgColor = darkTheme ?  "bg-slate-700" : "bg-slate-100"

    const fontColor = darkTheme ? "text-slate-100" : "text-slate-700"
    
    const btnBgColor = darkTheme ? "hover:bg-slate-600 px-3 py-1 rounded-2xl" : "hover:bg-slate-300 px-3 py-1 rounded-2xl"

    
    return (
        <div>
            <nav className={`border-slate-700 py-3 ${bgColor}`}>
                <div className="flex mx-auto sm:w-[640px] md:w-[750px] lg:w-[980px] xl:w-[1100px] 2xl:w-[1400px] justify-between ">
                    <div>
                        {/* Imagen para boton con direccion al inicio */}
                        <Link to="/">
                            <img className="w-30" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1769100140/star-wars-png-46074_fq5ugx.png" alt="" />
                        </Link>
                    </div>
                    <div>
                        <div className="hidden sm:flex items-center justify-between sm:w-75 h-16 md:w-100">

                            {store?.slug ?
                                <>

                                    {/* Botones en caso de que haya una agenda en store.slug */}
                                    
                                    {/* Boton para ver los contactos */}
                                    <Link to={`/${store?.slug}/contacts`}>
                                        <p className={`${fontColor} ${btnBgColor}`} >Contacts </p>
                                    </Link>
                                    <p className={`${fontColor} hover:cursor-default`}>|</p>

                                    {/* Boton con el dropdown con el nombre de la agenda */}
                                    <UserBtn fontColor={fontColor} main={true} />
                                </>
                                :
                                <>
                                    {/* Boton para elegir agenda, cuando no hay ninguna seleccionada */}
                                    <Link to="/agendas">
                                        <p className={`${fontColor} ${btnBgColor}`} >Choose an agenda</p>
                                    </Link>
                                    <b><p className={`${fontColor} hover:cursor-default`}>|</p></b>
                                    {/* Boton para abrir modal y crear una agenda si no hay ninguna seleccionada */}
                                    <p className={`${fontColor} ${btnBgColor} hover:cursor-pointer`} onClick={() => openModal({ type: "createAgenda" })}>Create agenda</p>
                                </>
                            }
                        </div>
                        <div className="relative sm:hidden">
                            {/* Contenido del dropdown */}
                            <Wrapper fontColor={fontColor}/>
                        </div>
                    </div>

                </div>

            </nav>
        </div>
    )
}