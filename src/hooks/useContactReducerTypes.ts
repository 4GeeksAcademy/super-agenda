


export type ContactContextType = {
    store: StoreType | undefined
    dispatch: React.Dispatch<any> | undefined
}


export type StoreType = {
    slug: string | null
    contacts: ContactType[] | null
}

type UserType = {
    slug: string,
    id: number
}

type ContactType = {
    name: string,
    phone: string,
    email: string,
    address: string,
    id: number

}


export type ContactProviderType = {
    children: React.ReactNode
}

