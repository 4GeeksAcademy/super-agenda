import type { TypesType } from "../components/Modal"



export type ContactContextType = {
    store: StoreType | undefined
    dispatch: React.Dispatch<any> | undefined,
    openModal: (type:(keyof TypesType))=> void
    closeModal: ()=> void
    loadAgendas: ()=> void
}


export type StoreType = {
    agendas: AgendaType[] | null
    slug: string | null
    contacts: ContactType[] | null
    isModal: boolean
    modalType: string
}

export type AgendaType = {
    slug: string
    id: number
}


export type ContactType = {
    name: string,
    phone: string,
    email: string,
    address: string,
    id: number

}


export type ContactProviderType = {
    children: React.ReactNode
}

