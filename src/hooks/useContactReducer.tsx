import { createContext, useContext, useReducer } from "react";
import type { StoreType, ContactProviderType, ContactContextType} from "./useContactReducerTypes";
import { initialStore, reducer } from "./useContactReducer/store";
import type { TypesType } from "../components/Modal";
import { getAllAgendas } from "../services/agendaServices";

const ContactContext = createContext<ContactContextType | undefined>(undefined)



export const ContactProvider = ({children}: ContactProviderType) =>{

    const [store, dispatch] = useReducer<StoreType, any>(reducer, initialStore)

    const openModal = (type:(keyof TypesType)) =>{
        dispatch({type: "OPEN_MODAL"})
        dispatch({type: "SET_MODAL_TYPE", payload: type})

    }

    const closeModal = () =>{
        dispatch({type: "CLOSE_MODAL"})
        dispatch({type: "SET_MODAL_TYPE", payload: "loading"})
    }

    const loadAgendas = async() =>{
        const agendas = await getAllAgendas()
        dispatch({type: "SET_AGENDAS", payload: agendas})
    }
   


return <ContactContext.Provider value={{store, dispatch, openModal, closeModal, loadAgendas}}>
    {children}
</ContactContext.Provider>
} 



export const useContactReducer = (): ContactContextType =>{
    const context = useContext(ContactContext)

    if(!context) throw new Error("useContactReducer must be used inside a ContactProvider")

    const {store, dispatch, openModal, closeModal, loadAgendas} = context

    return {store, dispatch, openModal, closeModal, loadAgendas}
}