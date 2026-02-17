import { useEffect, useRef, type Dispatch, type SetStateAction } from "react"
import type { ImageUploadModeType } from "./ModalCreateContact"

type NavImageModeType = {
    setImageUploadMode: Dispatch<SetStateAction<ImageUploadModeType>>,
    imageUploadMode: ImageUploadModeType
}


export const NavImageMode = ({ setImageUploadMode, imageUploadMode }: NavImageModeType) => {


    const buttonTypes: ImageUploadModeType[] = ["url", "upload", "ai"]

    const pillRef = useRef<HTMLDivElement>(null)

    const buttonRefs = useRef<HTMLButtonElement[]>([])
    buttonRefs.current = []


    useEffect(()=>{
        console.log(buttonRefs)
        const activeIndex = buttonTypes.indexOf(imageUploadMode)
        const activeButton = buttonRefs.current[activeIndex]

        if(activeButton && pillRef.current){
            const {offsetLeft, offsetWidth} = activeButton
            pillRef.current.style.width = `${offsetWidth}px`
            pillRef.current.style.transform = `translateX(${offsetLeft}px)`
        }

    },[imageUploadMode])

    return (<>
        <div className="relative bg-orange-400 m-2 px-4 py-2 rounded-full text-orange-800">
            {/* Botones para cambiar el tipo de metodo de subida */}
            <div className="relative flex gap-3 z-2">
                {buttonTypes.map((buttonType, index) => {
                    return (
                        <button
                        ref={el =>{el && buttonRefs.current.push(el)}}
                            onClick={() => setImageUploadMode(buttonType)}
                            type="button"
                            className={`z-3
                            ${imageUploadMode === buttonType ? "" : "hover:bg-orange-500"}
                            py-2 w-25 text-sm hover:cursor-pointer rounded-full
                            `}>
                            {index === 1 ? buttonType[0].toUpperCase() + buttonType.slice(1) : buttonType.toUpperCase()}</button>
                    )
                })}
            <div ref={pillRef} className={`absolute z-2 rounded-full  transition duration-1200 h-full top-0 left-0 bg-white`}></div>
            </div>


        </div>
    </>
    )
}