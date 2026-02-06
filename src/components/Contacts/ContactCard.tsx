import { useContactReducer } from "../../hooks/useContactReducer"

type ItemType = {
    name: string
    address: string
    phone: string
    email: string
    id: number
}

type ContactCardType = {
    item: ItemType
    agenda: string
}

export const ContactCard = ({item, agenda}:ContactCardType)=>{
    const {openModal} = useContactReducer()
    const {name, email, address, phone,id} = item

    const handleDelete = () => {
            if(id){
                openModal({type: "deleteContact", contactId: id.toString()})    
            }
    }

    const handleUpdateContact = () =>{
        if(id){
            openModal({type: "updateContact", formData: {name, phone, email, address, id}})
        }
    }


    return (
        <li className="col-span-12 lg:col-span-6 h-64 flex justify-center">
           <div className="relative w-68 h-45 grid grid-cols-12 gap-1 p-3 bg-slate-50 rounded-2xl hover:shadow-lg transition hover:duration-300">
            <div className="absolute -top-7 -rotate-2 left-1/2 h-17 w-10  bg-blue-100 opacity-50 border-x-1 border-blue-200"></div>
                <div className="col-span-4 row-span-3 bg-slate-300 rounded-xl"></div>
                <div className="col-span-8 flex justify-end">
                    <div className="rounded-md bg-slate-200 px-2">
                        <i onClick={handleUpdateContact} className="mr-2 hover:cursor-pointer transform hover:scale-110 hover:text-green-500 transition hover:duration-500 fa-solid fa-pen-to-square"></i>
                        <i onClick={handleDelete} className="hover:cursor-pointer transform hover:scale-110 hover:text-red-500 transition hover:duration-500 fa-solid fa-square-xmark"></i>
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