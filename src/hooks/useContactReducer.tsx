import { createContext, useReducer } from "react";
import type { ContactContextType, ContactProviderType } from "./useContactReducerTypes";

const ContactContext = createContext<ContactContextType | undefined>(undefined)

type UseReducerType {
    
}


const ContactProvider = ({children}: ContactProviderType) =>{

    const [store, dispatch] = useReducer()



return <ContactContext.Provider value={}>
    {children}
</ContactContext.Provider>

} 