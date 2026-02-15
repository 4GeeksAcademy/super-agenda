import { useEffect, useState, type ChangeEvent } from "react"
import { useContactReducer } from "../../hooks/useContactReducer"

type InputFormCreateContactType = {
    name: string
    value: string
    error: string
    onChange: (name: string, value: string) => void
}

export const InputFormCreateContact = ({ name, value, error, onChange }: InputFormCreateContactType) => {

    const label = name[0].toUpperCase() + name.slice(1)

    if(name == "address"){
        value = value.split("||")[0]
    }

    return (
        <div className="col-span-12 xl:col-span-6 flex xl:justify-start justify-center">
            <div className="flex flex-col w-70">

                <label className="text-lg" htmlFor={name}>{label}</label>
                <input className="border-1 rounded-xl w-full h-10 pl-4 text-slate-600" value={value} onChange={(event) => onChange(name, event.target.value)} id={name} name={name} type="text" />
                {error && (
                    <p className={`text-${value.length > 0 ? "red" : "slate"}-400`}>{error}</p>
                )}
            </div>
        </div>
    )

}