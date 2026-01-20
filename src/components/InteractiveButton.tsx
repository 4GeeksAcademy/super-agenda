type InteractiveButtonProps = {
    text: string,
    color: string
}

export const InteractiveButton = ({text, color} : InteractiveButtonProps) =>{
    return(
        <button className={`bg-${color}-500 hover:bg-${color}-400 active:bg-${color}-600 hover:cursor-pointer p-2 m-2 rounded-lg text-white`}>{text}</button>
    )
}