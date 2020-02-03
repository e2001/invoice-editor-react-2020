import invoicesService from "../service/invoices.service"
import {InvoiceActionTypes} from "./invoice.actions"
import mockData from "../mock-data"

export const AppActionTypes = {
  GET_APPLICATION_DATA_REQUESTED: 'GET_APPLICATION_DATA_REQUESTED',
  GET_APPLICATION_DATA_RESPONSE: 'GET_APPLICATION_DATA_RESPONSE',
}


export const getApplicationDataRequested = () => {
  return (dispatch, getState) => {

    dispatch({
      type: AppActionTypes.GET_APPLICATION_DATA_REQUESTED,
      payload: null
    })

    return new Promise((resolve ,reject)=>{
      setTimeout(() => {
        dispatch( getApplicationDataResponse(invoicesService.getAppData()))
        resolve()
      }, mockData.loadAppDataDelayMs)
    })

  }
}


export function getApplicationDataResponse(applicationData) {
  return {
    type: AppActionTypes.GET_APPLICATION_DATA_RESPONSE,
    payload: {applicationData}
  }
}
