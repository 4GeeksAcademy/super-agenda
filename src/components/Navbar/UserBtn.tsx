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


    const dropDownIcon = openDropDown ? <i className="fa-solid fa-angle-right"></i> : <i className="fa-solid fa-angle-left"></i>


    const darkTheme = fontColor?.includes("100")
    const bgColor = darkTheme ? main ? "bg-slate-100" : "bg-slate-700" : main ? "bg-slate-600" : "bg-slate-50"
    const hoveredBgColor = darkTheme ? main ? "hover:bg-slate-200" : "hover:bg-slate-700" : main ? "hover:bg-slate-700" : "hover:bg-slate-100"
    const btnFontColor = darkTheme ? main ? "text-slate-800" : "text-slate-100" : main ? "text-slate-100" : "text-slate-800"





    const dropDownBg = darkTheme ? "bg-slate-200" : "bg-slate-400"
    const dropDownIconMain = openDropDown ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>
    const dropdownBgHover = darkTheme ? "hover:bg-slate-100 active:bg-slate-300" : "hover:bg-slate-300 active:bg-slate-500"

    const rounded = openDropDown ? "rounded-tr-3xl" : "rounded-r-3xl"



    const roundedDropDownContent = main ? "rounded-l-2xl rounded-br-2xl" : "rounded-l-2xl rounded-br-2xl"



    return (
        <>
            <div tabIndex={0}
                onBlur={(event) => {
                    if(!event.currentTarget.contains(event.relatedTarget)){
                        setOpenDropDown(false)
                    }
                }}
                className="relative ">
                {
                    main ?
                        <div className="flex">
                            {/* Texto boton dropdown */}
                            <button className={`rounded-l-3xl py-2 border-r-1 border-slate-300 m-0 px-5 ${btnFontColor} ${bgColor} ${hoveredBgColor}`} ><b>{store?.slug} </b></button>

                            {/* Boton dropdown */}
                            <p onClick={() => setOpenDropDown(prev => !prev)} className={`hover:cursor-pointer my-auto py-2 pl-1 pr-2  ${dropdownBgHover} 
                            ${rounded} 
                            ${dropDownBg}
                            `}>
                                {dropDownIconMain}
                            </p>
                        </div>

                        :
                        <div className="flex">

                            {/* Boton dropdown */}
                            <p onClick={() => setOpenDropDown(prev => !prev)} className={` ${openDropDown ? "rounded-0":  "rounded-l-lg"} py-2 ${dropdownBgHover} ${dropDownBg} `} >
                                {dropDownIcon}
                            </p>

                            {/* Texto boton dropdown */}
                            <p className={`m-0 py-2 px-5 rounded-r-lg whitespace-nowrap ${btnFontColor} ${bgColor}`}>{store?.slug}</p>

                        </div>
                }


                <div className={`absolute z-1 ${main ? "right-0 mt-2 " : "top-0 -left-43"}
                 text-center p-3   ${roundedDropDownContent} ${!openDropDown && "hidden "} 
                 ${darkTheme ?
                        `bg-slate-200`
                        :
                        `bg-slate-400`
                    }
                 `}>
                    <ul>
                        <Link to="/agendas">
                            <li><button
                            onClick={()=>{
                                setOpenDropDown(false)
                            }}
                            className={`
                             px-4 py-2 rounded-full
                             hover:cursor-pointer
                             whitespace-nowrap
                               ${darkTheme ? `
                                 hover:bg-slate-300
                               active:bg-slate-100
                               `
                                    :
                                    `
                                hover:bg-slate-500
                                active:bg-slate-300
                                text-white
                               `}
                             `}
                            >Change agenda</button></li>
                        </Link>
                        {store?.slug &&
                            (<li><button className="px-3 my-2 py-2 whitespace-nowrap bg-red-500 hover:bg-red-400 active:bg-red-600 text-red-100 rounded-2xl " onClick={handleDeleteAgenda} >Delete agenda</button> </li>)
                        }
                    </ul>

                </div>
            </div>


        </>
    )
}