import { combineReducers } from "redux";

import { LOGOUT_SUCCESS } from "../../pages/auth/Signout";

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token')?true:false
},action){
    switch(action.type){
        case LOGOUT_SUCCESS:
            return Object.assign({}, state,{
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}

function quotes(state = {}, action){
    switch(action.type){
        default:
            return state
    }
}

const quoteApp = combineReducers({
    auth,
    quotes
})

export default quoteApp