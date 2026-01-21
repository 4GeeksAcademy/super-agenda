export type ContactContextType = {
    user: FullUserType | null,
    users: UserType[] | null
}


type FullUserType = {
    slug: string,
    contacts: ContactType[]
}

type UserType = {
    slug: string,
    id: number
}

type ContactType = {
    name: string,
    phone: string,
    email: string,
    addres: string,
    id: number

}


export type ContactProviderType = {
    children: React.ReactNode
}

