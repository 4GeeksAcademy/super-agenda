import type { StoreType } from "../useContactReducerTypes"

export const initialStore = {
    slug: null,
    contacts: null
}

export type ActionType = {
    type: string,
    payload: string
}

export const reducer = (store:StoreType,action:ActionType)=>{
    switch (action.type) {
        case "SET_USER":
            
            return {...store, slug: action.payload }
    
        default:
            return store
    }
}
