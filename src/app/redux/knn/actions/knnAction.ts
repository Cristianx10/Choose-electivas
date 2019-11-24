export const type = "knnAction";

const knnAction = (action: string, value: Object) => {

    return {
        type,
        payload: { type: action, value: value }
    }
}

export default knnAction;