import { Link } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"

export const Navbar = () => {

    const { store } = useContactReducer()



    return (
        <div>
            <nav className="flex justify-center">
                <div className="flex justify-between">
                <div className="mr-auto">

                <Link to="/">
                <img  className="w-30" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1769100140/star-wars-png-46074_fq5ugx.png" alt="" />
                </Link>
                </div>
                
                <Link to="/user">
                    <InteractiveButton color="slate" text="User" />
                </Link>
                {/* <Link to={`/${store?.slug}/contacts`}>
                    <InteractiveButton color="slate" text="Contacts" />
                    </Link> */}

                </div>
            </nav>
        </div>
    )
}