import {Moment} from "moment"

export const ACTIONS = {
    DATE_PICK: 'date_pick'
} as const;


export type GlobalState = {
    datePic: Moment | null
};

export type ActionTypes = 
    | { type: typeof ACTIONS.DATE_PICK, payload: Moment | null }


export const intialState = {
    datePic: null
};



export const globalReducer = (intialState: GlobalState, action: ActionTypes) => {

    switch (action.type) {

        case ACTIONS.DATE_PICK:
            return {
                ...intialState,
                datePic: action.payload
            };

        default:
            return intialState;
    }
};