import { IStoreReducer } from '../store';
import { type as findsUsers } from './actions/findUsers';
import { type as setUserPrincipal } from './actions/setUserPrincipal';
import { type as setNumUserSimilars } from './actions/setNumUserSimilars';
import KnnUser from '../../objects/Knn/KnnUser';
import CellValue from '../../objects/Knn/CellValue';
import { knnPersonas } from '../knn/knnAdmin';
import { type as setKnnObserver } from '../knn/actions/setKnnObserver';
import ManagerKNN from '../../objects/Knn/ManagerKNN';



var userDefaultState = {
    name: "Nombre de usuario",
    usuarios: knnPersonas.getAllName() as string[],
    knnObserver: knnPersonas,
    similarsUsers: [] as KnnUser[],
    userInformation: [] as CellValue[],
    numSimilarsUsers: 0,
};

const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {

    var findSimilarUser = () => {
        let ref = knnPersonas.getRef(_this.name);
        _this.userInformation = ref.information;
        _this.similarsUsers = _this.knnObserver.calculate(ref, _this.numSimilarsUsers);
    }

    switch (type) {
        case findsUsers:
            _this.usuarios = payload as string[];
            break;
        case setUserPrincipal:
            _this.name = payload as string;
            findSimilarUser();
            break;
        case setNumUserSimilars:
            _this.numSimilarsUsers = payload as number;
            findSimilarUser();
            break;

        case setKnnObserver:
            _this.knnObserver = payload as ManagerKNN;
            findSimilarUser();
            break;
        default:
            break;
    }

    userDefaultState = _this;

    return { ..._this };
}

export type IUser = ReturnType<typeof reducer>;

export default reducer;