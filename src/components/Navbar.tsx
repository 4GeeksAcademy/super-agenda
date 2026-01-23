import { Link } from "react-router"
import { InteractiveButton } from "./InteractiveButton"
import { useContactReducer } from "../hooks/useContactReducer"

export const Navbar = () => {

    const { store } = useContactReducer()



    return (
        <div>
            <nav>
                <button onClick={() => console.log(store?.slug)}>Ver store.slug</button>
                <Link to="/">
                    <InteractiveButton color="slate" text="Home" />
                </Link>
                <Link to="/user">
                    <InteractiveButton color="slate" text="User" />
                </Link>
                <Link to={`/${store?.slug}/contacts`}>
                    <InteractiveButton color="slate" text="Contacts" />
                </Link>
                {store?.slug ?
                    <Link to={`/${store?.slug}/contact-form`}>
                        <InteractiveButton color="slate" text="ContactForm" />
                    </Link>
                    :
                    <InteractiveButton color="disabled-slate" text="ContactForm" />

                }
            </nav>
        </div>
    )
}