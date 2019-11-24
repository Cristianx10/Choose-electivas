import { IStoreReducer } from '../store';
import { type as findsUsers } from './actions/findUsers';
import { type as setUserPrincipal } from './actions/setUserPrincipal';
import { type as setNumUserSimilars } from './actions/setNumUserSimilars';
import ManagerKNN from '../../objects/Knn/ManagerKNN';
import LoadFile from '../../objects/utils/loadFile';
import DatabasePersonas from "../../data/persona.csv";
import KnnUser from '../../objects/Knn/KnnUser';
import CellValue from '../../objects/Knn/CellValue';

var knnPersonas = new ManagerKNN(new LoadFile(DatabasePersonas).database);

var defaultState = {
    name: "Nombre de usuario",
    usuarios: knnPersonas.getAllName() as string[],
    similarsUsers: [] as KnnUser[],
    userInformation: [] as CellValue[],
    numSimilarsUsers: 0
};

const reducer = (state = defaultState, { type, payload }: IStoreReducer) => {

    const findSimilarUser = () => {
        let ref = knnPersonas.getRef(state.name);
        state.similarsUsers = knnPersonas.calculate(ref, state.numSimilarsUsers);
        state.userInformation = knnPersonas.getRef(state.name).information;
    }

    switch (type) {
        case findsUsers:
            state.usuarios = payload as string[];
            break;
        case setUserPrincipal:
            state.name = payload as string;
            findSimilarUser();
            break;
        case setNumUserSimilars:
            state.numSimilarsUsers = payload as number;
            findSimilarUser();
            break;
        default:
            break;
    }

    return { ...state };
}

export type IUser = ReturnType<typeof reducer>;

export default reducer;