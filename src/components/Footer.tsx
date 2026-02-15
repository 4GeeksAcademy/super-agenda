import { Link, useLocation } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"

export const Footer = () => {

    const { store, openModal } = useContactReducer()
    const location = useLocation()


    const darkTheme = location.pathname.includes("agendas") || location.pathname == "/"
    const buttonClasses = ` 
        ${!darkTheme
            ?
            `hover:bg-slate-200 active:bg-white `
            :
            ` hover:bg-slate-600 active:bg-slate-800`
        }
    px-4  py-2 rounded-full  hover:cursor-pointer`

    return (
        <footer className="">
            <div className={`${darkTheme ?
                "bg-slate-900 text-slate-300"
                :
                "bg-slate-50 text-slate-700"
                }
            pb-15 pt-10
            `

            }>
                <div className={`${ !darkTheme && "border-t-1 border-slate-400"} pt-15 mx-auto max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4  grid grid-cols-12 gap-4`}>
                    {store?.slug ?

                        <>

                            <div className="col-span-6 sm:col-span-4 text-center border-r-1">
                                <Link to="/agendas">
                                    <button  className={buttonClasses} >Change agenda</button>
                                </Link>
                            </div>


                            <div className="col-span-6 sm:col-span-4   text-center sm:border-r-1">
                                <Link to={`/${store.slug}/contacts`}>
                                    <button className={buttonClasses}>Contacts</button>
                                </Link>
                            </div>

                            <div className="col-span-12 sm:col-span-4  text-center">
                                <Link to="/about-me">
                                    <button className={buttonClasses}>About me</button>
                                </Link>
                            </div>

                            <div className="col-span-12 my-3 flex justify-center">
                                <Link to="/">
                                    <img className="w-30" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1771149871/ChatGPT_Image_15_feb_2026_10_46_23_eeo8xs.png" alt="" />
                                </Link>
                            </div>

                            <div className="col-span-12 text-center">
                                <p>1717 Harrison St, San Francisco, CA 94103, USA<br /> © 2022 Your Company.  All rights reserved.</p>
                            </div>

                        </>
                        :
                        <>
                            <div className="col-span-6 sm:col-span-4 text-center border-r-1">

                                <Link to="/agendas">
                                    <button className={buttonClasses}>Choose agenda</button>
                                </Link>
                            </div>

                            <div className="col-span-6 sm:col-span-4 text-center sm:border-r-1">
                                <button  className={buttonClasses} onClick={() => openModal({ type: "createAgenda" })}>Create agenda</button>
                            </div>

                            <div className="col-span-12 sm:col-span-4 text-center">
                                <Link to="/about-me">
                                    <button className={buttonClasses}>About me</button>
                                </Link>
                            </div>
                            <div className="col-span-12 flex justify-center my-3">
                                <Link to="/">
                                    <img className="w-30" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1771149871/ChatGPT_Image_15_feb_2026_10_46_23_eeo8xs.png" alt="" />
                                </Link>
                            </div>
                            <div className="col-span-12  text-center">
                                <p>Valencia, Valencia, Spain<br /> © 2026 Super Agenda.  All rights reserved.</p>
                            </div>
                        </>
                    }

                </div>
            </div>
        </footer>
    )
}