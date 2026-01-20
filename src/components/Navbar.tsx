import { Link } from "react-router"
import { InteractiveButton } from "./InteractiveButton"

export const Navbar = () =>{
    return(
        <div>
        <nav>
            <Link to="/">
            <InteractiveButton color="slate" text="Home"/>
            </Link>
            <Link to="/user">
            <InteractiveButton color="slate" text="User"/>
            </Link>
            <Link to="/contacts">
            <InteractiveButton color="slate" text="Contacts"/>
            </Link>
            <Link to="/contact-form">
            <InteractiveButton color="slate" text="ContactForm"/>
            </Link>
        </nav>
        </div>
    )
}