import { createStore, combineReducers } from "redux";
import user from "./user/user";
import navegation from "./navegation/navegation";

const reducer = combineReducers({
    user,
    navegation
});

export var Store = createStore(reducer);

export default Store;

export type IStore = ReturnType<typeof reducer>
export interface IStoreReducer {
    type: string;
    payload: Object;
}