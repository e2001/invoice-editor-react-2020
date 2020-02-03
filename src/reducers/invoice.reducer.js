import {InvoiceActionTypes} from "../actions/invoice.actions"


export const initialState = {
  loading: false,
  recordCollection: [],
  editedItemId: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case InvoiceActionTypes.ADD_RECORD_RESPONSE: {
      const {invoice: newInvoice} = action.payload
      const newRecordCollection = [
        ...state.recordCollection,
        newInvoice
      ]
      return {
        ...state,
        loading: false,
        recordCollection: newRecordCollection
      }
    }
    case InvoiceActionTypes.GET_RECORDS_REQUESTED: {

      return {
        ...state,
        loading: true
      }
    }
    case InvoiceActionTypes.GET_RECORDS_RESPONSE: {

      const {recordCollection} = action.payload
      return {
        ...state,
        loading: false,
        recordCollection: recordCollection
      }
    }
    case InvoiceActionTypes.INVOICE_EDITED_START_RESPONSE: {
      const {id} = action.payload

      return {
        ...state,
        editedItemId: id
      }
    }
    case InvoiceActionTypes.SAVE_INVOICE_RESPONSE: {
      const {invoice: updatedInvoice} = action.payload
      const newRecordCollection = state.recordCollection.map((item, index) => {
        if (item.id !== updatedInvoice.id) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...updatedInvoice,
          initial:false
        }
      })
      return {
        ...state,
        editedItemId: null,
        recordCollection: newRecordCollection
      }
    }
    case InvoiceActionTypes.DELETE_INVOICE_RESPONSE: {
      const {id: idToRemove} = action.payload
      const newRecordCollection = state.recordCollection.filter(function (value) {
        return value.id !== idToRemove
      })
      return {
        ...state,
        editedItemId: idToRemove === state.editedItemId ? null : state.editedItemId,
        recordCollection: newRecordCollection
      }
    }
    case InvoiceActionTypes.INVOICE_EDIT_END_RESPONSE: {

      return {
        ...state,
        editedItemId: null
      }
    }
    case InvoiceActionTypes.GET_APPLICATION_DATA_RESPONSE: {
      const {applicationData} = action.payload
      return {
        ...state,
        ...applicationData
      }
    }
    case InvoiceActionTypes.DELETE_ALL_EMPTY_RECORDS_RESPONSE:{
      const {skippArray} = action.payload
      //remove all empty records, except for any in skip array
      const newRecordCollection = state.recordCollection.filter(function (value) {
        return value.initial === false || skippArray.indexOf(value.id) !== -1
      })

      return {
        ...state,
        recordCollection: newRecordCollection
      }
    }
  }

  return state
}
