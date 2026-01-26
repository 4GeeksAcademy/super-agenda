import { Link } from "react-router"
import { InteractiveButton } from "../InteractiveButton"
import { UserBtn } from "./UserBtn"
import { useContactReducer } from "../../hooks/useContactReducer"
import { useState } from "react"

export const Wrapper = () => {
    const { store } = useContactReducer()
    const [wrapperOpen, setWrapperOpen] = useState(false)

    return (
        <>
            <InteractiveButton onClick={()=> setWrapperOpen(prev=> !prev)} tone="dark" color="slate" text="Hamburguesa" />
            <div className={`${wrapperOpen ? "absolute": "hidden"} bg-red-500`}>
                <ul>
                    {store?.slug ?
                        <>
                            <li> <UserBtn main={false}/></li>
                            <li> <Link to={`/${store?.slug}/contacts`}>
                                <InteractiveButton tone="normal" color="slate" text="Contacts" />
                            </Link></li>
                        </>
                        :
                        <li><Link to="/user">
                            <InteractiveButton text="Choose an agenda" color="slate" tone="normal" />
                        </Link></li>
                    }
                </ul>
            </div>
        </>
    )
}