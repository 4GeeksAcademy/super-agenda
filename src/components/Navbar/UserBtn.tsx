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
            <div className="relative bg-blue-500">

                {
                    main ?
                        <>
                            <InteractiveButton extraClass="mr-0 mb-0" tone="dark" color="slate" text={`${store?.slug}`} />
                            <InteractiveButton onClick={() => setOpenDropDown(prev => !prev)} extraClass="ml-0 mb-0 mr-0" tone="dark" color="slate" text="V" />
                        </>

                        :
                        <div className="flex">
                            <InteractiveButton onClick={() => setOpenDropDown(prev => !prev)} extraClass="ml-0 mb-0 mr-0" tone="dark" color="slate" text="<" />
                            <InteractiveButton extraClass="mr-0 mb-0" tone="dark" color="slate" text={`${store?.slug}`} />

                        </div>
                }

               
                <div tabIndex={0} onBlur={() => setOpenDropDown(false)} className={`absolute ${main ? "right-0 ": "-left-40 top-0"}  min-w-40 text-right bg-white rounded-md border-1 ${!openDropDown && "hidden "} `}>

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