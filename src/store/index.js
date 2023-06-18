import { createStore } from 'redux'
import initialState from "./state"
import rootReducer from './reducers'
import fonts from '../library/fonts';
import database from '../library/database';

export default () => {
    return new Promise( async (resolve) => {
        let appState = initialState;
        try {
            // const cached = await database.getAll();
            // if ( cached.length !== 0 ) {
            //     await fonts.load(cached);
            //     appState.fonts = cached.map( f => ({ id: f.id, name: f.name}));
            //     appState.dir = await database.get("dirname", "config");
            // }
            const store = createStore(rootReducer, appState);
            resolve(store);
        } catch (error) {
            const store = createStore(rootReducer, appState);
            console.log(`REDUX_ERROR`,error, store.getState());
            resolve(store);
        }
    });
};