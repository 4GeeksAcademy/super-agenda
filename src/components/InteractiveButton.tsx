type InteractiveButtonProps = {
    text: string
    color: string
    onClick?: ()=> void
}

export const InteractiveButton = ({text, color, onClick} : InteractiveButtonProps) =>{
    return(
        <button onClick={onClick} className={`bg-${color}-500 hover:bg-${color}-400 active:bg-${color}-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white`}>{text}</button>
    )
}