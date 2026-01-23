import type { TypesType } from "../components/Modal"
import type { OpenModalTypes } from "./useContactReducer"



export type ContactContextType = {
    store: StoreType | undefined
    dispatch: React.Dispatch<any> | undefined,
    openModal: (data: OpenModalTypes)=> void
    closeModal: ()=> void
    loadAgendas: ()=> void
}


export type StoreType = {
    agendas: AgendaType[] | null
    slug: string | null
    contacts: ContactType[] | null
    isModal: boolean
    modalType: string
    userToDelete: string
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

