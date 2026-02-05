type CardType = {
    title: string
    description: string
    place: number
}


export const Card = ({ title, description, place }: CardType) => {


    const icon = place == 1 ? "user": place == 2? "pencil" : "check"


    return (
        <div className="w-50 lg:w-60 flex flex-col py-3">

            <div className=" grid grid-cols-12 gap-2 rounded-xl">
                <div className="col-span-12 lg:col-span-4  text-center">
                    <div className="p-3 inline-block bg-slate-300 rounded-2xl">
                        <i className={`py-2 text-4xl text-slate-600 fa-solid fa-${icon}`}></i>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8   flex items-center justify-center">
                    <div className="my-2 text-xl lg:text-2xl text-center font-medium" >{title}</div>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="lg:col-span-4"></div>
                <div className="col-span-12 lg:col-span-8  flex items-center">
                    <div className="text-[0.8rem] lg:text-sm text-center lg:text-start text-slate-500" >{description}</div>

                </div>
            </div>


        </div>
    )
}