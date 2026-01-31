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
    const [openDropDown, setOpenDropDown] = useState(true)

    const handleDeleteAgenda = () => {
        if (!store?.slug) return

        openModal({ type: "deleteUser", agenda: store?.slug })
    }



    const darkTheme = fontColor?.includes("100")

    const bgColor = darkTheme ? "bg-slate-50" : "bg-slate-500"

    const hoveredBgColor = darkTheme ? "hover:bg-slate-300" : "hover:bg-slate-800"

    const btnFontColor = darkTheme ? "text-slate-700" : "text-slate-100"

    const dropDownBg = darkTheme ? "bg-slate-200" : "bg-slate-300"

    const dropDownIconMain = openDropDown ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>
    const dropDownIcon = openDropDown ? <i className="fa-solid fa-angle-right"></i> : <i className="fa-solid fa-angle-left"></i>

    const dropdownBgHover = darkTheme ? "hover:bg-slate-300" : "hover:bg-slate-400"
    const rounded = openDropDown ?  "rounded-tr-3xl" : "rounded-r-3xl"



    const roundedDropDownContent = main ? "rounded-l-2xl rounded-br-2xl" : "rounded-sm"

    

    return (
        <>
            <div tabIndex={0} 
            onBlur={(event)=>{
                if(!event.currentTarget.contains(event.relatedTarget)){
                    setOpenDropDown(false)
                }
            }} 
            className="relative ">
                {
                    main ?
                        <div className="flex">
                            {/* Texto boton dropdown */}
                            <button className={`rounded-l-3xl py-2 m-0 border-1 px-5 ${btnFontColor} ${bgColor} ${hoveredBgColor}`} ><b>{store?.slug} </b></button>

                            {/* Boton dropdown */}
                            <p onClick={() => setOpenDropDown(prev => !prev)} className={`hover:cursor-pointer my-auto py-2 pl-1 pr-2  ${dropdownBgHover} 
                            ${rounded} ${btnFontColor} ${dropDownBg}`}>
                                {dropDownIconMain}
                            </p>
                        </div>

                        :
                        <div className="flex">

                            {/* Boton dropdown */}
                            {/* <p onClick={() => setOpenDropDown(prev => !prev)} className={`rounded-l-lg py-2 ${dropdownBgHover} ${dropDownBg} ${btnFontColor}`} >
                                 {dropDownIcon}
                                </p> */}

                            {/* Texto boton dropdown */}
                            <p className={`m-0 py-2 px-5 rounded-r-lg ${btnFontColor} ${bgColor}`}>{store?.slug}</p>

                        </div>
                }


                <div className={`absolute ${main ? "right-0 " : "-left-38 transform -translate-y-1/2"}
                 text-right bg-white ${roundedDropDownContent} border-1 ${!openDropDown && "hidden "} `}>

                    <ul>
                        <Link to="/agendas">
                            <li >Change </li>
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