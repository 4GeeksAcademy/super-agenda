import { Link } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"
import { UserBtn } from "./Navbar/UserBtn"
import { Wrapper } from "./Navbar/Wrapper"

export const Navbar = () => {

    const { store } = useContactReducer()



    return (
        <div>
            <nav className="border-b-2 border-slate-700 mx-2 py-3">
                <div className="flex mx-auto sm:w-[640px] md:w-[750px] lg:w-[980px] xl:w-[1100px] 2xl:w-[1400px] justify-between ">
                    <div>
                        <Link to="/">
                            <img className="w-30" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1769100140/star-wars-png-46074_fq5ugx.png" alt="" />
                        </Link>
                    </div>
                    <div>
                        <div className="hidden sm:flex">

                            {store?.slug ?
                            <>
                                <UserBtn main={true}/>
                                <Link to={`/${store?.slug}/contacts`}>
                                <InteractiveButton tone="normal" color="slate" text="Contacts" />
                                </Link>
                            </>
                                :
                                <Link to="/user">
                                    <InteractiveButton text="Choose an agenda" color="slate" tone="normal" />
                                </Link>
                            }
                        </div>
                        <div className="relative sm:hidden">
                            
                            <Wrapper/>
                        </div>
                    </div>

                </div>

            </nav>
        </div>
    )
}