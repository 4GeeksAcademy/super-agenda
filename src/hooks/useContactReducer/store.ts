import type { TypesType } from "../../components/Modal"
import type { AgendaType, ContactType, StoreType } from "../useContactReducerTypes"

export const initialStore = {
    slug: null,
    agendas: null,
    contacts: null,
    isModal: true,
    modalType: "loading"
}



type UserAgendaType = {
    slug: string | null
    contacts: ContactType[] | null
    isModal: boolean
    modalType: string
}



export type ActionType = 
|{type : "SET_AGENDA"; payload: UserAgendaType}
|{type : "OPEN_MODAL" | "CLOSE_MODAL"}
|{type: "SET_MODAL_TYPE"; payload: keyof TypesType}
|{type: "SET_AGENDAS"; payload: AgendaType[]}



export const reducer = (store: StoreType, action: ActionType) => {
    switch (action.type) {
        case "SET_AGENDA":
            const slug = action.payload.slug
            const contacts = action.payload.contacts

            return { ...store, slug, contacts }

        case "OPEN_MODAL":
            return { ...store, isModal: true }

        case "CLOSE_MODAL":
            return { ...store, isModal: false }

        case "SET_MODAL_TYPE":
            const type = action.payload
            return { ...store, modalType: type }

        case "SET_AGENDAS":

            return {...store, agendas: action.payload}

        default:
            return store
    }
}
