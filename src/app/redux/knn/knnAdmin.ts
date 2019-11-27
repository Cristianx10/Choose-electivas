import ManagerKNN from '../../objects/Knn/ManagerKNN';
import LoadFile from '../../objects/utils/loadFile';




import { IStoreReducer } from '../store';
import { type as knnAction } from './actions/knnAction';
import { knnNameElectivas } from './databaseFiles';






var KnnDefaultState = {
    knnObserver: knnNameElectivas
};

const reducer = (_this = KnnDefaultState, { type, payload }: IStoreReducer) => {


    const setKNNObserver = (knnObserver: ManagerKNN) => {
        _this.knnObserver = knnObserver;
    }

    switch (type) {

        case knnAction:
            let result = payload as { type: string, value: Object };

            break;

        default:
            break;
    }

    KnnDefaultState = _this;

    return { ..._this };
}

export type IKnn = ReturnType<typeof reducer>;

export default reducer;

export var KNN_ACTION = {
    setKnnObserver: { val: "setKnnObserver", option: { knnPersonas: "knnPersonas", knnLugares: "knnLugares" } }
}

