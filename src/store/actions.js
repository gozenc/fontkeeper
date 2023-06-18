import { 
    DATA_LOADED,
    STORE_ADDER,
    STORE_SETTER,
    FONTS_LOADED 
} from './constants'

export function addStore(prop, payload) {
    return { type: STORE_ADDER, prop, payload }
}

export function setStore(prop, payload) {
    return { type: STORE_SETTER, prop, payload }
}

export function setFonts(payload) {
    return { type: FONTS_LOADED, payload }
}

export function fetchData() {
    return async dispatch => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const repsonseJson = await response.json()
        dispatch({ type: DATA_LOADED, payload: repsonseJson.slice(0, 10) })
    }
}