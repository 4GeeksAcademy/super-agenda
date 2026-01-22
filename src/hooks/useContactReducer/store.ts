import type { StoreType } from "../useContactReducerTypes"

export const initialStore = {
    slug: null,
    contacts: null
}

export type ActionType = {
    type: string,
    payload: StoreType
}


export const reducer = (store:StoreType,action:ActionType)=>{
    switch (action.type) {
        case "SET_AGENDA":
            
            return action.payload
    
        default:
            return store
    }
}
