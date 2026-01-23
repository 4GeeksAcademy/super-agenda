import type { TypesType } from "../../components/Modal"
import type { StoreType } from "../useContactReducerTypes"

export const initialStore = {
    slug: null,
    contacts: null,
    isModal: true,
    modalType: "loading"
}

// export type ActionType = {
//     type: string,
//     payload: StoreType | keyof TypesType
// }

export type ActionType = 
|{type : "SET_AGENDA"; payload: StoreType}
|{type : "OPEN_MODAL" | "CLOSE_MODAL"}
|{type: "SET_MODAL_TYPE"; payload: keyof TypesType}



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

        default:
            return store
    }
}
