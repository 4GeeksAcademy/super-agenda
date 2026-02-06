type ContactCardType = {
    name: string
    address: string
    phone: string
    email: string
}

export const ContactCard = ({name, address, phone, email}:ContactCardType)=>{
    return (
        <li className="col-span-12 lg:col-span-6 lg:block flex justify-center ">
           <div className="w-68 h-45 grid grid-cols-12 gap-1 p-3 bg-slate-50 rounded-2xl">
                <div className="col-span-4 row-span-3 bg-slate-300 rounded-xl"></div>
                <div className="col-span-8 flex justify-end">
                    <div className="rounded-md bg-slate-200 px-2">
                        <i className="mr-2 hover:cursor-pointer transform hover:scale-110 hover:text-green-500 transition hover:duration-500 fa-solid fa-pen-to-square"></i>
                        <i className="hover:cursor-pointer transform hover:scale-110 hover:text-red-500 transition hover:duration-500 fa-solid fa-square-xmark"></i>
                    </div>
                </div>
                <div className="pl-3 col-span-8 text-xl">{name}</div>
                <div className="pl-3 col-span-8">{email}</div>
                <div className="pt-2 col-span-12">{address}</div>
                <div className="col-span-12">{phone}</div>
           </div>
        </li>
    )
}