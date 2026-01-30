import { Link } from "react-router"
import { useContactReducer } from "../../hooks/useContactReducer"
import { InteractiveButton } from "../InteractiveButton"
import { useState } from "react"


type UserBtnType = {
    main: boolean
    fontColor: string
}

export const UserBtn = ({ main, fontColor }: UserBtnType) => {

    const { store, openModal } = useContactReducer()
    const [openDropDown, setOpenDropDown] = useState(false)

    const handleDeleteAgenda = () => {
        if (!store?.slug) return

        openModal({ type: "deleteUser", agenda: store?.slug })
    }

    const darkTheme = fontColor?.includes("100")

    const bgColor = darkTheme ? "bg-slate-200" : "bg-slate-500"

    const hoveredBgColor = darkTheme ? "hover:bg-slate-300" : "hover:bg-slate-800"

    const btnFontColor = darkTheme ? "font-color-2" : "font-color-4"


    const dropDownBg = darkTheme ? "bg-slate-50" : "bg-slate-200"


    return (
        <>
            <div  className="relative">
                {
                    main ?
                        <div className="flex">
                            <button className={`rounded-l-3xl py-2 m-0 border-1 px-5 ${btnFontColor} ${bgColor} ${hoveredBgColor}`} ><b>{store?.slug} </b></button>
                            <p onClick={() => setOpenDropDown(prev => !prev)} className={`hover:cursor-pointer my-auto py-2 pl-1 pr-2 ${openDropDown ? "": ""} rounded-l-lg rounded-full ${btnFontColor} ${dropDownBg}`}>V</p> 
                        </div>

                        :
                        <div className="flex">
                            <p onClick={() => setOpenDropDown(prev => !prev)} className={`m-0 rounded-l-lg ${btnFontColor}`} >&lt; gggg</p>
                            <p className={`m-0 rounded-r-lg ${btnFontColor} ${bgColor}`}>{store?.slug}</p> 

                        </div>
                }

               
                <div tabIndex={0} onBlur={() => setOpenDropDown(false)} className={`absolute ${main ? "right-0 ": "-left-35 top-0 transform -translate-y-3 "}  min-w-35 text-right bg-white rounded-md border-1 ${!openDropDown && "hidden "} `}>

                    <ul>
                        <Link to="/agendas">
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