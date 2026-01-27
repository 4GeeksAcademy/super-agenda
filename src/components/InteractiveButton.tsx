import { buttonColors } from "./utilsInteractiveButton"

type InteractiveButtonProps = {
    text?: string
    color: keyof typeof buttonColors
    onClick?: ()=> void
    disabled?: boolean
    buttonType?: "submit" | "reset" | "button"
    tone: keyof ToneType
    extraClass?:string
    onBlur?:()=> void
    children?: React.ReactNode
}


type ToneType = {
    normal: string
    light: string
    dark: string
    disabled: string
}


export const InteractiveButton = ({text, color, onClick, disabled, buttonType, tone, extraClass, onBlur, children} : InteractiveButtonProps) =>{


   
    const extraClassRounded = extraClass?.includes("rounded-")
   const extraClassMargin = extraClass?.includes("m-")

   const finalClass=` ${buttonColors[color][tone]} ${extraClassRounded || " rounded-lg "}  ${extraClassMargin || " m-2 "} ${extraClass}`

    return(
        <button onBlur={onBlur} type={buttonType ?? "submit"}  disabled={disabled} onClick={onClick} className={finalClass}>{text ?? children}</button>
    )
}