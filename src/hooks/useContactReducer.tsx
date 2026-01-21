import { createContext, useContext, useReducer } from "react";
import type { StoreType, ContactProviderType, ContactContextType} from "./useContactReducerTypes";
import { initialStore, reducer } from "./useContactReducer/store";

const ContactContext = createContext<ContactContextType | undefined>(undefined)



export const ContactProvider = ({children}: ContactProviderType) =>{

    const [store, dispatch] = useReducer<StoreType, any>(reducer, initialStore)



return <ContactContext.Provider value={{store, dispatch}}>
    {children}
</ContactContext.Provider>
} 



export const useContactReducer = (): ContactContextType =>{
    const context = useContext(ContactContext)

    if(!context) throw new Error("useContactReducer must be used inside a ContactProvider")

    const {store, dispatch} = context

    return {store, dispatch}
}