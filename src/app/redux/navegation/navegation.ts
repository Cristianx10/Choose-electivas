import { IStoreReducer } from '../store';
import { type as serUrlPage } from './actions/serUrlPage';

var defaultState = { url: "" };

const reducer = function (state = defaultState, { type, payload }: IStoreReducer) {
    
    switch (type) {
        case serUrlPage:
            state.url = payload as string;
            break;
        default:
            break;
    }

    return { ...state };
}

export type INavegation = ReturnType<typeof reducer>;

export default reducer;