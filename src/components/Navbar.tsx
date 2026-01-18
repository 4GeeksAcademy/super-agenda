import { Link } from "react-router"

export const Navbar = () =>{
    return(
        <div>
        <nav>
            <Link to="/">
            <button className="bg-slate-500 hover:bg-slate-400 active:bg-slate-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white">Home</button>
            </Link>
            <Link to="/user">
            <button className="bg-slate-500 hover:bg-slate-400 active:bg-slate-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white">User</button>
            </Link>
            <Link to="/contacts">
            <button className="bg-slate-500 hover:bg-slate-400 active:bg-slate-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white">Contacts</button>
            </Link>
            <Link to="/contact-form">
            <button className="bg-slate-500 hover:bg-slate-400 active:bg-slate-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white">ContactForm</button>
            </Link>
        </nav>
        </div>
    )
}