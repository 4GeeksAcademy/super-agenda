import { Link } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"

export const Footer = () => {

    const { store, openModal } = useContactReducer()


    return (
        <footer>
            <div className="bg-orange-400">
                <div className="mx-auto bg-blue-400 sm:w-[640px] md:w-[750px] lg:w-[980px] xl:w-[1100px] 2xl:w-[1400px]">

                    <p>Soy Footer</p>

                    {store?.slug ?

                        <>
                            <Link to="/agendas">
                                <p>Change agenda</p>
                            </Link>
                            <Link to={`/${store.slug}/contacts`}>
                                <p>Contacts</p>
                            </Link>
                            <Link to="/about-me">
                                <p>About me</p>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/agendas">
                                <p>Choose agenda</p>
                            </Link>
                           
                                <p className="hover:cursor-pointer" onClick={()=> openModal({type: "createAgenda"})}>Create agenda</p>
                           
                            <Link to="/about-me">
                                <p>About me</p>
                            </Link>
                        </>
                    }



                </div>
            </div>
        </footer>
    )
}