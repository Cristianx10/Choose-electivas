export const type = "setKnnObserver";

const setKnnObserver = (value: Object) => {

    return {
        type,
        payload: value
    }
}

export default setKnnObserver;