import { createContext, useContext, useReducer } from "react";
import type { StoreType, ContactProviderType, ContactContextType} from "./useContactReducerTypes";
import { initialStore, reducer } from "./useContactReducer/store";

const ContactContext = createContext<ContactContextType | undefined>(undefined)



export const ContactProvider = ({children}: ContactProviderType) =>{

    const [store, dispatch] = useReducer<StoreType, any>(reducer, initialStore)

    const openModal = () =>{
        dispatch({type: "OPEN_MODAL"})
    }

    const closeModal = () =>{
        dispatch({type: "CLOSE_MODAL"})
    }


return <ContactContext.Provider value={{store, dispatch, openModal, closeModal}}>
    {children}
</ContactContext.Provider>
} 



export const useContactReducer = (): ContactContextType =>{
    const context = useContext(ContactContext)

    if(!context) throw new Error("useContactReducer must be used inside a ContactProvider")

    const {store, dispatch, openModal, closeModal} = context

    return {store, dispatch, openModal, closeModal}
}