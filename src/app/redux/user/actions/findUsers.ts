export const type = "findUsers";

const findsUsers = function (nombres: string[]) {

    return {
        type,
        payload: nombres
    }
}

export default findsUsers;