import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { ACTIONS, ActionTypes, GlobalStateType } from "./globalStateContextTypes";



export const globalReducer = (intialState: GlobalStateType, action: ActionTypes): GlobalStateType => {

    switch (action.type) {

        case ACTIONS.GO_LIVE:
            return { ...intialState, isLive: action.payload };
        default:
            return intialState;
    }
};


const ContextData = createContext<{ state: GlobalStateType; dispatch: React.Dispatch<ActionTypes> } | undefined>(undefined);

const initalState: GlobalStateType = {
    isLive: false
}

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, initalState);

    const memoizedValue = useMemo(() => ({
        state: {
            isLive: state.isLive
        },
        dispatch
    }), [state.isLive])

    return (
        <ContextData.Provider value={memoizedValue}>
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
