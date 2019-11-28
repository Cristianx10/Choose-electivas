import ManagerKNN from '../../../objects/Knn/ManagerKNN';
export const type = "setListNamesKnn";

const setListNamesKnn = (value: ManagerKNN) => {

    return {
        type,
        payload: value
    }
}

export default setListNamesKnn;