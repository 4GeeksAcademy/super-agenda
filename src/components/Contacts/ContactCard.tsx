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

export const ContactCard = ({item}:ContactCardType)=>{
    const {openModal} = useContactReducer()
    const {name, email, address, phone,id} = item

    const [finalAddress, photo] = address.split("||")
   


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
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center">
           <div className="relative w-68 h-45 grid grid-cols-12 gap-1 p-3 bg-slate-50 rounded-2xl hover:shadow-2xl/100 transform hover:scale-105  transition hover:duration-300">
            <div className="absolute -top-7 -rotate-5 left-1/2 h-15 w-10  bg-blue-100 opacity-50 border-x-1 border-blue-200"></div>
                <div className="col-span-4 row-span-3 bg-slate-900 overflow-hidden rounded-xl">
                    <img className="w-full h-25 object-cover" src={photo || "https://res.cloudinary.com/dra2cr3uw/image/upload/v1771152203/Imagen_ejemplo_contacto_kgnycj.png"}/>
                </div>
                <div className="col-span-8 flex justify-end">
                    <div className="rounded-md bg-slate-200 px-2">
                        <i onClick={handleUpdateContact} className="mr-2 hover:cursor-pointer transform hover:scale-110 hover:text-green-500 transition hover:duration-500 fa-solid fa-pen-to-square"></i>
                        <i onClick={handleDelete} className="hover:cursor-pointer transform hover:scale-110 hover:text-red-500 transition hover:duration-500 fa-solid fa-square-xmark"></i>
                    </div>
                </div>
                <div title={name} className="pl-3 col-span-8 "><p className="bg-slate-800 text-slate-50 text-xl truncate rounded-lg pl-2">
                    {name}
                    </p>
                    </div>
                <div title={email} className="pl-3 col-span-8 truncate">{email}</div>
                <div title={address} className="pt-2 col-span-12 truncate">{finalAddress}</div>
                <div title={phone} className="col-span-12 truncate">{phone}</div>
           </div>
        </div>
    )
}