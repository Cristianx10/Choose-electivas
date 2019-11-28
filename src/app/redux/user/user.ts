import { IStoreReducer } from '../store';
import { type as findsUsers } from './actions/findUsers';
import { type as setUserPrincipal } from './actions/setUserPrincipal';
import { type as setNumUserSimilars } from './actions/setNumUserSimilars';
import { type as setListNamesKnn } from '../knn/actions/setListNamesKnn';

import KnnUser from '../../objects/Knn/KnnUser';
import CellValue from '../../objects/Knn/CellValue';
import { type as setKnnObserver } from '../knn/actions/setKnnObserver';

import ManagerKNN from '../../objects/Knn/ManagerKNN';
import { knnNameElectivas, knnElectivas } from '../knn/databaseFiles';

var userDefaultState = {
    name: "Nombre de usuario",
    usuarios: knnNameElectivas.getAllName() as string[],
    knnObserver: knnNameElectivas,
    refKnnName: knnNameElectivas,

    similarsUsers: [] as KnnUser[],
    userInformation: [] as CellValue[],
    numSimilarsUsers: 1,
};

const reducer = (_this = userDefaultState, { type, payload }: IStoreReducer) => {

    var findSimilarUser = () => {
        let ref = _this.refKnnName.getRef(_this.name);
       /* console.log("Bucando....")
        console.log(ref)
        console.log(_this.knnObserver.dataObserver)
        console.log("Finalizado....")*/
        if(ref){
            _this.userInformation = ref.information;
            _this.similarsUsers = _this.knnObserver.calculate(ref, _this.numSimilarsUsers);
        }
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

        case setListNamesKnn:
            _this.refKnnName = payload as ManagerKNN;
            _this.usuarios = _this.refKnnName.getAllName()

            if (_this.refKnnName === knnElectivas) {
                _this.knnObserver = knnElectivas;
            }

            if (_this.refKnnName === knnNameElectivas) {
                _this.knnObserver = knnNameElectivas;
            }

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