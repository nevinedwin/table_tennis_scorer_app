import { createContext, ReactNode, useContext, useReducer } from "react";
import { ActionTypes, globalReducer, GlobalState, intialState } from "./globalReducer";



const ContextData = createContext<{ state: GlobalState; dispatch: React.Dispatch<ActionTypes> } | undefined>(undefined);


export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, intialState);

    return (
        <ContextData.Provider value={{ state, dispatch }}>
            {children}
        </ContextData.Provider>
    )
};


export const useGlobalState = () => {
    const context = useContext(ContextData);
    if (context === undefined) {
        throw new Error("Use Global state must be within a provider");
    }
    return context;
}
