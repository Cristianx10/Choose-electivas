export const type = "setKnnObserverConsenso";

const setKnnObserverConsenso = function (nombres: number) {

    return {
        type,
        payload: nombres
    }
}

export default setKnnObserverConsenso;