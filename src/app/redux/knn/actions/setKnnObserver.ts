import ManagerKNN from '../../../objects/Knn/ManagerKNN';
export const type = "setKnnObserver";

const setKnnObserver = (value: ManagerKNN) => {

    return {
        type,
        payload: value
    }
}

export default setKnnObserver;