import { createContext, useContext, useReducer } from "react";
import type { StoreType, ContactProviderType, ContactContextType } from "./useContactReducerTypes";
import { initialModalFormData, initialStore, reducer, type FormDataType } from "./useContactReducer/store";
import { getAgenda, getAllAgendas } from "../services/agendaServices";


const ContactContext = createContext<ContactContextType | undefined>(undefined)

export type OpenModalTypes =
    | { type: "deleteUser"; agenda: string }
    | { type: "updateContact"; formData: FormDataType }
    | { type: "createUser" | "loading" | "createContact"}

export const ContactProvider = ({ children }: ContactProviderType) => {

    const [store, dispatch] = useReducer<StoreType, any>(reducer, initialStore)

    const openModal = (data: OpenModalTypes) => {
        dispatch({ type: "OPEN_MODAL" })
        switch (data.type) {
            case "deleteUser":
                dispatch({ type: "SET_USER_TO_DELETE", payload: data.agenda })
                break
            
            case "updateContact":
                dispatch({ type: "SET_MODAL_FORM_DATA", payload: data.formData})
                break

        }
        dispatch({ type: "SET_MODAL_TYPE", payload: data.type })
    }

    const resetSlugAndContacts = ()=>{
        dispatch({type: "SET_AGENDA", payload: {slug: null, contacts: null}})
    }

    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" })
        dispatch({ type: "SET_USER_TO_DELETE", payload: "" })
        dispatch({ type: "SET_MODAL_TYPE", payload: "loading" })
        dispatch({type: "SET_MODAL_FORM_DATA", payload: initialModalFormData })
    }

    const loadAgendas = async () => {
        const agendas = await getAllAgendas()
        dispatch({ type: "SET_AGENDAS", payload: agendas })
    }

    const loadAgenda = async(agenda:string)=>{
        const agendaData = await getAgenda(agenda)
        dispatch({type: "SET_AGENDA", payload: agendaData})
    }



    return <ContactContext.Provider value={{ store, dispatch, openModal, closeModal, loadAgendas, loadAgenda, resetSlugAndContacts }}>
        {children}
    </ContactContext.Provider>
}



export const useContactReducer = (): ContactContextType => {
    const context = useContext(ContactContext)

    if (!context) throw new Error("useContactReducer must be used inside a ContactProvider")

    const { store, dispatch, openModal, closeModal, loadAgendas, loadAgenda, resetSlugAndContacts } = context

    return { store, dispatch, openModal, closeModal, loadAgendas, loadAgenda, resetSlugAndContacts }
}