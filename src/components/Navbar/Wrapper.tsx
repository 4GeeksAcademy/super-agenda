import { Link } from "react-router"
import { InteractiveButton } from "../InteractiveButton"
import { UserBtn } from "./UserBtn"
import { useContactReducer } from "../../hooks/useContactReducer"
import { useState } from "react"

export const Wrapper = () => {
    const { store } = useContactReducer()
    const [wrapperOpen, setWrapperOpen] = useState(false)
    

    return (
        <div tabIndex={0} onBlur={(event)=>{
            if(!event.currentTarget.contains(event.relatedTarget)){
                setWrapperOpen(false)
            }
        }}>
            <InteractiveButton onClick={()=> setWrapperOpen(prev=> !prev)} tone="dark"  color="slate">
                <i className='fa-solid fa-grip-lines'></i>
                </InteractiveButton>
            <div className={`${wrapperOpen ? "absolute": "hidden"} right-0 w-30 bg-red-500`}>
                <ul>
                    {store?.slug ?
                        <>
                            <li> <UserBtn main={false}/></li>
                            
                            <li> <Link to={`/${store?.slug}/contacts`}>
                                <InteractiveButton tone="normal" color="slate" text="Contacts" />
                            </Link></li>
                        </>
                        :
                        <li><Link to="/agendas">
                            <InteractiveButton text="Choose an agenda" color="slate" tone="normal" />
                        </Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}