type InteractiveButtonProps = {
    text: string
    color: keyof typeof colors
    onClick?: ()=> void
    
}
const colors = {
    red: "bg-red-500 hover:bg-red-400 active:bg-red-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white",   
    blue: "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white",
    orange: "bg-orange-500 hover:bg-orange-400 active:bg-orange-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white",
    slate: "bg-slate-500 hover:bg-slate-400 active:bg-slate-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white",
    yellow: "bg-red-500 hover:bg-red-400 active:bg-red-600 hover:cursor-pointer p-2 m-2 rounded-lg text-orange-500",
    green: "bg-green-500 hover:bg-green-400 active:bg-green-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white",

    "disabled-red": "bg-red-300 p-2 m-2 rounded-lg text-white",
    "disabled-blue": "bg-blue-300 p-2 m-2 rounded-lg text-white",
    "disabled-orange": "bg-orange-300 p-2 m-2 rounded-lg text-white",
    "disabled-slate": "bg-slate-300 p-2 m-2 rounded-lg text-white",
    "disabled-yellow": "bg-yellow-300 p-2 m-2 rounded-lg text-white",
    "disabled-green": "bg-green-300 p-2 m-2 rounded-lg text-white"
    
} as const

export const InteractiveButton = ({text, color, onClick} : InteractiveButtonProps) =>{


    return(
        <button onClick={onClick} className={`${colors[color]}`}>{text}</button>
    )
}