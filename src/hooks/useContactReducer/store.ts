import type { StoreType } from "../useContactReducerTypes"

export const initialStore = {
    slug: null,
    contacts: null,
    modal: false
}

export type ActionType = {
    type: string,
    payload: StoreType
}


export const reducer = (store:StoreType,action:ActionType)=>{
    switch (action.type) {
        case "SET_AGENDA":
            const slug =   action.payload.slug  
            const contacts =  action.payload.contacts

            return {...store, slug,contacts}
    
        case "OPEN_MODAL":
            return {...store, modal: true}

        case "CLOSE_MODAL":
            return {...store, modal: false}
        default:
            return store
    }
}
