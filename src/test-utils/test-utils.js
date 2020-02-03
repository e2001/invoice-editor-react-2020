import {cloneDeep} from 'lodash'
import checkPropTypes from 'check-prop-types'
import {createStore, applyMiddleware} from "redux"
import {middlewareArray} from "../configure-store"
import rootReducer, {initialStoreState} from '../reducers'


export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewareArray)(createStore)
  return createStoreWithMiddleware(rootReducer, initialState)
}

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name)
  expect(propError).toBeUndefined()
}

export const makeMockStateShallow = (invoiceState, appState) => {
  const mockState = {
    invoiceState:{
      ...initialStoreState.invoiceState,
      ...invoiceState
    },
    appState:{
      ...initialStoreState.appState,
      ...appState
    }
  }
  return mockState
}

export const makeMockState = (invoiceState, appState) => {
  return cloneDeep(makeMockStateShallow(invoiceState, appState))
}
