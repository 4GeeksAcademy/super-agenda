


export type ContactContextType = {
    store: StoreType | undefined
    dispatch: React.Dispatch<any> | undefined,
    openModal: ()=> void
    closeModal: ()=> void
}


export type StoreType = {
    slug: string | null
    contacts: ContactType[] | null
    isModal: boolean
    modalType: string


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

