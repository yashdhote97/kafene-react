import {createStore} from "redux";

export function loginStatus(payload) {
    return {
        type: "LOGIN_STATUS",
        payload
    }
}


const initialState = {
    loginStatus:false,
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case "LOGIN_STATUS":
                return { ...state, loginStatus:action.payload};             
        default:
            return state;
    }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store