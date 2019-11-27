import ManagerKNN from '../../objects/Knn/ManagerKNN';
import LoadFile from '../../objects/utils/loadFile';

import DatabaseElectivasVsInfo from "../../data/ELECTIVAS_VS_INFO.csv";
import DatabaseElectivasVsLugares from "../../data/ELECTIVAS_VS_LUGARES.csv";
import DatabaseLugaresVsInfo from "../../data/LUGARES_VS_INFO.csv";
import DatabaseNameVsInfoElectivas from "../../data/NAME_VS_INFO_ELECTIVAS.csv";
import DatabaseNameVsInfoLugares from "../../data/NAME_VS_INFO_LUGARES.csv";



import { IStoreReducer } from '../store';
import { type as knnAction } from './actions/knnAction';
import LoadFileCombine from '../../objects/utils/loadFileCombine';


export var knnPersonas = new ManagerKNN(new LoadFile(DatabasePersonas).database);
export var knnLugares = new ManagerKNN(new LoadFile(DatabaseLugares).database);

var loadFiles = new LoadFileCombine(DataElectivasylugares);

export var knnMixElectivasLugares = new ManagerKNN(loadFiles.databaseA);
///knnMixElectivasLugares.addToDatabase();
knnMixElectivasLugares.addToDatabase(loadFiles.databaseB);

knnMixElectivasLugares.setDatabase("Marrakech");
var refe = knnMixElectivasLugares.getRef("Marrakech");



var KnnDefaultState = {
    knnObserver: knnLugares
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

