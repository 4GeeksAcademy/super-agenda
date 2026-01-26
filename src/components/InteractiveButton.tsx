import { buttonColors } from "./utilsInteractiveButton"

type InteractiveButtonProps = {
    text: string
    color: keyof typeof buttonColors
    onClick?: ()=> void
    disabled?: boolean
    buttonType?: "submit" | "reset" | "button"
    tone: keyof ToneType
    extraClass?:string
    onBlur?:()=> void
}


type ToneType = {
    normal: string
    light: string
    dark: string
    disabled: string
}


export const InteractiveButton = ({text, color, onClick, disabled, buttonType, tone, extraClass, onBlur} : InteractiveButtonProps) =>{


    return(
        <button onBlur={onBlur} type={buttonType ?? "submit"}  disabled={disabled} onClick={onClick} className={`${buttonColors[color][tone]} ${extraClass}`}>{text}</button>
    )
}