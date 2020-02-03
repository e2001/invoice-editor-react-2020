import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export const middlewareArray = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewareArray)(createStore);

export default createStoreWithMiddleware(rootReducer);
