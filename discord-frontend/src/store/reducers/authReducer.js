const initialState = {
    userDetails: null
}

const authReducer = (state = { initialState }, action ) => {
    switch (action.type) {
        case "DUMMY":
            return {
                ...state
            }
        default:
            return state
    }
}

export default authReducer