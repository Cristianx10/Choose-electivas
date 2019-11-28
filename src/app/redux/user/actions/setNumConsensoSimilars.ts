export const type = "setNumConsensoSimilars";

const setNumConsensoSimilars = function (nombres: number) {

    return {
        type,
        payload: nombres
    }
}

export default setNumConsensoSimilars;