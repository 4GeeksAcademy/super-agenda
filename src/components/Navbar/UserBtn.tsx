import { Link } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { InteractiveButton } from "../InteractiveButton"
import { useState } from "react"

export const UserBtn = () => {

    const { store } = useContactReducer()
    const [openDropDown, setOpenDropDown] = useState(false)

    return (
        <>  
            <div className="relative bg-blue-500">

            <InteractiveButton extraClass="mr-0 mb-0" tone="dark" color="slate" text={`${store?.slug}`} />
            <InteractiveButton onBlur={()=> setOpenDropDown(false)} onClick={()=> setOpenDropDown(prev => !prev)} extraClass="ml-0 mb-0 mr-0" tone="dark" color="slate" text="V"/>
            <div className={`absolute right-0 min-w-30 text-right bg-white rounded-md ${!openDropDown && "hidden "} `}>
                
                   <ul>
                    <Link to={`/${store?.slug}/contacts`}>
                    <li >Contacts</li>
                    </Link>
                    <Link to="/user">
                    <li >Change agenda</li>
                    </Link>
                   </ul>
                
            </div>
            </div>
            
    
        </>
    )
}