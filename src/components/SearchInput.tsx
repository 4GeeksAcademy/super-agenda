import {type ChangeEventHandler } from "react"


type SearchInputType = {
    themeDark: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
    searchInput: string
    setSearchInput: (value:string)=> void
}

export const SearchInput = ({themeDark, onChange, searchInput, setSearchInput}:SearchInputType) => {

    const inputClass = themeDark ? "bg-slate-50 mx-20 text-slate-900" : "bg-slate-900 text-slate-50 mx-20"

    const background = inputClass.split(" ")[0]

    

  

    return (
        <div className={`relative ${inputClass} my-5 px-2 py-3 rounded-full `}>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hover:cursor-pointer">
            <button disabled={!searchInput} onClick={()=> setSearchInput("")}>
                <i className={`text-xl fa-solid fa-${searchInput ? "xmark hover:cursor-pointer" : "search"}`}></i>
            </button>
            </div>
            <div className="px-5 md:px-12">
                <input value={searchInput} onChange={onChange} placeholder={`Search your ${themeDark ? "agenda" : "contact"}`} className={`h-10 text-lg ${background} w-full outline-none`}></input>
            </div>
        </div>
    )
}