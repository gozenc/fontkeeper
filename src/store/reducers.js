import initialState from "./state"
import { STORE_ADDER, STORE_SETTER, FONTS_LOADED } from './constants'

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case STORE_ADDER:
            checkProp(action.prop, state)
            return {
                ...state,
                // articles: state.articles.concat(action.payload)
                [action.prop]: [...state[action.prop], action.payload]
            }
        case STORE_SETTER:
            checkProp(action.prop, state)
            return {
                ...state,
                [action.prop]: action.payload
            }
        case FONTS_LOADED:
            return {
                ...state,
                fonts: action.payload
            }
        default:
            return state
    }
}

function checkProp(prop, state){
    if ( !prop in state ) {
        console.error(`${prop} doesn't found in ${state}`)
        return state
    }
}

export default rootReducer