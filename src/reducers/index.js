import {createStore} from "redux";

export function setLogin(payload) {
    localStorage.setItem("loginStatus", JSON.stringify(payload));
    return {
        type: "SET_LOGIN",
        payload
    }
}


const initialState = {
    loginStatus:JSON.parse(localStorage.getItem("loginStatus"))||false,
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case "SET_LOGIN":
                return { ...state, loginStatus:action.payload};             
        default:
            return state;
    }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store
