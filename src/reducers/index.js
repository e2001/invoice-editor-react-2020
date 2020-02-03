import { combineReducers } from 'redux';
import InvoiceReducer, {initialState as invoiceInitialState} from './invoice.reducer';
import AppReducer, {initialState as appInitialState} from './app.reducer';



const rootReducer = combineReducers({
    invoiceState: InvoiceReducer,
    appState:AppReducer
})

export const initialStoreState = {
    invoiceState:invoiceInitialState,
    appState:appInitialState
}

export default rootReducer
