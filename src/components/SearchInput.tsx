import { useState, type ChangeEvent } from "react"


type SearchInputType = {
    themeDark: boolean
}

export const SearchInput = ({themeDark}:SearchInputType) => {

    const inputClass = themeDark ? "bg-slate-50 mx-5 text-slate-900" : "bg-slate-900 text-slate-50 mx-15"

    const background = inputClass.split(" ")[0]

    const [searchInput, setSearchInput] = useState("")

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className={`relative ${inputClass} my-5 p-2 py-3 rounded-full`}>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hover:cursor-pointer">
                <i className="text-xl fa-solid fa-search"></i>
            </div>
            <div className="px-12">
                <input onChange={handleSearchInput} placeholder="Search your agenda" className={`h-10 text-lg ${background} w-full outline-none`}></input>
            </div>
        </div>
    )
}