export const type = "serUrlPage";

const serUrlPage = function (nombres: string) {

    return {
        type,
        payload: nombres
    }
}

export default serUrlPage;