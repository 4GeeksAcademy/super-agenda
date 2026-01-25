import type { TypesType } from "../components/Modal"
import type { OpenModalTypes } from "./useContactReducer"
import type { ActionType, FormDataType } from "./useContactReducer/store"



export type ContactContextType = {
    store: StoreType | undefined
    dispatch: React.Dispatch<ActionType> | undefined,
    openModal: (data: OpenModalTypes)=> void
    closeModal: ()=> void
    loadAgendas: ()=> void
    loadAgenda: (agenda: string)=> void
}


export type StoreType = {
    agendas: AgendaType[] | null
    slug: string | null
    contacts: ContactType[] | null
    isModal: boolean
    modalType: keyof TypesType
    userToDelete: string
    modalFormData: FormDataType
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

