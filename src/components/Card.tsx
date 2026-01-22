
type ItemType = {
    name: string,
    phone: string, 
    email: string,
    address: string
}


type CardType = {
    item: ItemType
}


export const Card = ({item: {name, phone, email, address}} : CardType) =>{

    

    return(
        <div>
            <p>{name}</p>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
        </div>
    )
}