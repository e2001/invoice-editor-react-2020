import invoicesService from "../service/invoices.service"
import mockData from "../mock-data"


export const InvoiceActionTypes = {
  GET_RECORDS_RESPONSE: 'GET_RECORDS_RESPONSE',
  ADD_RECORD_RESPONSE: 'ADD_RECORD_RESPONSE',
  GET_RECORDS_REQUESTED: 'GET_RECORDS_REQUESTED',
  INVOICE_EDITED_START_RESPONSE: 'INVOICE_EDITED_START_RESPONSE',
  INVOICE_EDIT_END_RESPONSE: 'INVOICE_EDIT_END_RESPONSE',
  SAVE_INVOICE_RESPONSE: 'SAVE_INVOICE_RESPONSE',
  DELETE_INVOICE_RESPONSE: 'DELETE_INVOICE_RESPONSE',
  DELETE_ALL_EMPTY_RECORDS_RESPONSE: 'DELETE_ALL_EMPTY_RECORDS_RESPONSE',
}


export function deleteAllEmptyRecordsRequest() {
  return (dispatch, getState) => {
    const {invoiceState} = getState()
    const currentEditedItemId = invoiceState.editedItemId

    dispatch(deleteAllEmptyRecordsResponse([currentEditedItemId]))
  }
}

export function deleteAllEmptyRecordsResponse(skippArray) {
  return {
    type: InvoiceActionTypes.DELETE_ALL_EMPTY_RECORDS_RESPONSE,
    payload: {skippArray: skippArray}
  }
}

export const deleteInvoiceRequested = (id) => {
  return (dispatch, getState) => {
      dispatch(deleteInvoiceResponse(id))
  }
}

export function deleteInvoiceResponse(id) {
  return {
    type: InvoiceActionTypes.DELETE_INVOICE_RESPONSE,
    payload: {id}
  }
}

export const saveInvoiceRequested = (invoice) => {
  return (dispatch, getState) => {

    //Note : record is saved to state only if passes validation
    if (invoicesService.isRecordValid(invoice)) {
      dispatch(saveInvoiceResponse(invoice))
    }
  }
}

export function saveInvoiceResponse(invoice) {
  return {
    type: InvoiceActionTypes.SAVE_INVOICE_RESPONSE,
    payload: {invoice}
  }
}

export const invoiceEditEndRequested = (id) => {
  return{
    type: InvoiceActionTypes.INVOICE_EDIT_END_RESPONSE,
    payload: null
  }
}

export const invoiceEditStartRequested = (id) => {
  return (dispatch, getState) => {

    const {invoiceState} = getState()
    const currentEditedItemId = invoiceState.editedItemId

    if (!!currentEditedItemId) {
      //cannot edit another item while an item is already edited
    } else {
      dispatch({
        type: InvoiceActionTypes.INVOICE_EDITED_START_RESPONSE,
        payload: {id}
      })
    }

  }
}

export const getRecordsRequested = () => {
  return (dispatch, getState) => {

    dispatch({
      type: InvoiceActionTypes.GET_RECORDS_REQUESTED,
      payload: null
    })

    return new Promise((resolve ,reject)=>{
      setTimeout(() => {
        //simulated : fetch records from backend
        dispatch(getRecordsResponse(invoicesService.getRecords()))
        resolve()
      }, mockData.loadRecordDelayMs)
    })

  }
}

export function getRecordsResponse(recordCollection) {

  return {
    type: InvoiceActionTypes.GET_RECORDS_RESPONSE,
    payload: {recordCollection}
  }
}

export const addRecordRequested = () => {
  return (dispatch, getState) => {

    const {invoiceState} = getState()
    const loading = invoiceState.loading

    if (loading) {
      //cannot add item while loading
    } else {
      //Note : we can add a new item even if in the middle of editing one
      dispatch(addRecordResponse(invoicesService.createNewRecord()))
    }

  }
}

export function addRecordResponse(invoice) {

  return {
    type: InvoiceActionTypes.ADD_RECORD_RESPONSE,
    payload: {invoice}
  }
}

