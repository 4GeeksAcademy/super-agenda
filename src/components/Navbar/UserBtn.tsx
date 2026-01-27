import { Link } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { InteractiveButton } from "../InteractiveButton"
import { useState } from "react"


type UserBtnType = {
    main: boolean
}

export const UserBtn = ({ main }: UserBtnType) => {

    const { store, openModal } = useContactReducer()
    const [openDropDown, setOpenDropDown] = useState(false)

    const handleDeleteAgenda = () => {
        if (!store?.slug) return

        openModal({ type: "deleteUser", agenda: store?.slug })
    }

    return (
        <>
            <div  className="relative">

                {
                    main ?
                        <>
                            <InteractiveButton extraClass=" rounded-l-lg m-0" tone="dark" color="slate" text={`${store?.slug}`} />
                            <InteractiveButton  onClick={() => setOpenDropDown(prev => !prev)} extraClass="m-0 rounded-r-lg" tone="dark" color="slate" text="V" />
                        </>

                        :
                        <div className="flex">
                            <InteractiveButton onClick={() => setOpenDropDown(prev => !prev)} extraClass="m-0 rounded-l-lg" tone="dark" color="slate" text="<" />
                            <InteractiveButton extraClass="m-0 rounded-r-lg" tone="dark" color="slate" text={`${store?.slug}`} />

                        </div>
                }

               
                <div tabIndex={0} onBlur={() => setOpenDropDown(false)} className={`absolute ${main ? "right-0 ": "-left-35 top-0 transform -translate-y-3 "}  min-w-35 text-right bg-white rounded-md border-1 ${!openDropDown && "hidden "} `}>

                    <ul>
                        <Link to="/user">
                            <li >Change agenda</li>
                        </Link>
                        {store?.slug &&
                            (<li><InteractiveButton onClick={handleDeleteAgenda} text="Delete agenda" color="red" tone="normal" /> </li>)
                        }
                    </ul>

                </div>
            </div>


        </>
    )
}