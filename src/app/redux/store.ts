import { createStore, combineReducers } from "redux";
import user from "./user/user";
import navegation from "./navegation/navegation";
import knnAdmin from "./knn/knnAdmin";

const reducer = combineReducers({
    user,
    navegation,
    knnAdmin
});

export var Store = createStore(reducer);


export default Store;

export type IStore = ReturnType<typeof reducer>
export interface IStoreReducer {
    type: string;
    payload: Object;
}