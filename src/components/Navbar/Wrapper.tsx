import { Link } from "react-router"
import { InteractiveButton } from "../InteractiveButton"
import { UserBtn } from "./UserBtn"
import { useContactReducer } from "../../hooks/useContactReducer"
import { useState } from "react"


type WrapperType = {
    fontColor: string
    darkTheme: boolean
}

export const Wrapper = ({ fontColor, darkTheme }: WrapperType) => {
    const { store, openModal } = useContactReducer()
    const [wrapperOpen, setWrapperOpen] = useState(false)

    const darkThemeColors = `bg-slate-50 hover:bg-white active:bg-slate-200 text-slate-700`
    const withoutDarkThemeColors = `bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-100`
    const dTDropDownColors = "bg-slate-50 text-slate-700"
    const withoutdTDropDownColors = "bg-slate-700 text-slate-100"

    const dropdownColors = darkTheme ? dTDropDownColors : withoutdTDropDownColors

    const wrapperColors = darkTheme ? darkThemeColors : withoutDarkThemeColors
    return (
        <div tabIndex={0} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
                setWrapperOpen(false)
            }
        }}>

            <button className={`m-0 p-2 ${wrapperOpen ? "rounded-l-xl rounded-tr-xl" : "rounded-xl"} ${wrapperColors} hover:cursor-pointer`} onClick={() => setWrapperOpen(prev => !prev)} >
                <i className='fa-solid fa-grip-lines text-2xl'></i>
            </button>
            <div className={`${wrapperOpen ? "absolute" : "hidden"} z-2 mt-2 right-0 rounded-l-2xl rounded-br-2xl text-center ${dropdownColors} p-4`}>
                <ul>

                    {store?.slug ?
                        <>
                            <li> <UserBtn fontColor={fontColor} main={false} /></li>
                            <li><Link to={`/${store?.slug}/contacts`}>
                                <button onClick={() => setWrapperOpen(false)} className={`mt-4
                                    ${darkTheme ?
                                        `hover:bg-slate-200
                                        active:bg-white
                                        `
                                        :
                                        `
                                        hover:bg-slate-600
                                        active:bg-slate-800
                                        `
                                    }
                                    px-4 py-2 rounded-full 
                                    hover:cursor-pointer`} >Contacts</button>
                            </Link></li>
                        </>
                        :
                        <>
                            <li>
                            <Link to="/agendas">
                                <button 
                                onClick={()=>{
                                    setWrapperOpen(false)
                                }}
                                className={`px-3 py-1 rounded-full hover:cursor-pointer whitespace-nowrap
                                    ${darkTheme 
                                        ?
                                        `bg-slate-300
                                        hover:bg-slate-200
                                        active:bg-slate-400
                                        `
                                        :
                                        `
                                        bg-slate-500
                                        hover:bg-slate-400
                                        active:bg-slate-600
                                        `
                                    }
                                    `}> Choose an agenda</button>
                            </Link>
                                <button className={`px-3 mt-3 py-1 rounded-full hover:cursor-pointer whitespace-nowrap
                                    ${darkTheme 
                                        ?
                                        `bg-slate-300
                                        hover:bg-slate-200
                                        active:bg-slate-400
                                        `
                                        :
                                        `
                                        bg-slate-500
                                        hover:bg-slate-400
                                        active:bg-slate-600
                                        `
                                    }
                                    `}
                                    onClick={() => openModal({ type: "createAgenda" })}> Create agenda</button>
                            
                            </li>
                    <li>

                    </li>
                </>
                    }
            </ul>
        </div>
        </div >
    )
}