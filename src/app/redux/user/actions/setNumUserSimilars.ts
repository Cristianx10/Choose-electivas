export const type = "setNumUserSimilars";

const setNumUserSimilars = function (nombres: number) {

    return {
        type,
        payload: nombres
    }
}

export default setNumUserSimilars;