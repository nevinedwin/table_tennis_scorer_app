
export enum ACTIONS {
    GO_LIVE = "go_live"
};


export type GlobalStateType = {
    isLive: boolean
};

export type ActionTypes = 
    | { type: ACTIONS.GO_LIVE, payload: boolean }



