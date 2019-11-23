export const type = "setUserPrincipal";


const setUserPrincipal = (name: string) => {
    return {
        type,
        payload: name
    }
}



export default setUserPrincipal;