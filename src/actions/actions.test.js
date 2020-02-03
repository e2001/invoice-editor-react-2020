import React from 'react'
import {makeMockState, storeFactory} from "../test-utils/test-utils"
import {
  addRecordRequested,
  deleteAllEmptyRecordsRequest,
  deleteInvoiceRequested, invoiceEditStartRequested,
  saveInvoiceResponse
} from "./invoice.actions"
import invoicesService from "../service/invoices.service"
import utils from "../utils/utils"


describe('1 invoice.actions action dispatch', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('1 updates state correctly on dispatch(addRecordRequested)', () => {

    const store = storeFactory()

    //step 1 : spyOn invoicesService.createNewRecord method
    const spyOnCreateNewRecord = jest.spyOn(invoicesService, 'createNewRecord')

    //step 2 : dispatch an action with input
    store.dispatch(addRecordRequested())

    //step 3 : get result of call to createNewRecord
    let createdRecord = spyOnCreateNewRecord.mock.results[0].value

    //step 4 : get the state
    const newState = store.getState()

    //step 5 : our expected state
    const recordCollection = [createdRecord]
    const expectedState = makeMockState({recordCollection})

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('2 updates state correctly on dispatch(deleteAllEmptyRecordsRequest)', () => {

    const mockRecordCollection = [
      utils.createRecord('book1', 1, 10),
      utils.createRecord(),
      utils.createRecord()
    ]
    const mockedInitialState = makeMockState({recordCollection: mockRecordCollection})

    const expectedState = makeMockState({recordCollection: [mockRecordCollection[0]]})

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(deleteAllEmptyRecordsRequest())

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('3 dose not delete empty edited record when calling dispatch(deleteAllEmptyRecordsRequest)', () => {

    //three new record are created, one is being edited ,
    // and we request to delete all empty records ( dispatch deleteAllEmptyRecordsRequest )

    const mockRecordCollection = [
      utils.createRecord(),          //this is a new record
      utils.createRecordWithId(100), //this is a new record
      utils.createRecord()            //this is a new record
    ]
    const mockedInitialState = makeMockState({
      editedItemId: 100,   //we indicate this row is now edited
      recordCollection: mockRecordCollection
    })

    const expectedState = makeMockState({
      editedItemId: 100,
      recordCollection: [mockRecordCollection[1]]
    })

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(deleteAllEmptyRecordsRequest())

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('4 updates state correctly on dispatch(saveInvoiceResponse)', () => {

    const mockedRecord = utils.createRecordWithId(1)

    const expectedRecord = {
      id: 1,
      title: 'jar',
      count: 1,
      price: 100,
      initial: false
    }

    const mockedInitialState = makeMockState({recordCollection: [mockedRecord]})

    const expectedState = makeMockState({recordCollection: [expectedRecord]})

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(saveInvoiceResponse({
      id: 1,
      title: 'jar',
      count: 1,
      price: 100
    }))

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('5 updates state correctly on dispatch(deleteInvoiceRequested)', () => {

    const mockedRecord = utils.createRecordWithId(211, 'lamp', 1, 44)

    const mockedInitialState = makeMockState({recordCollection: [mockedRecord]})

    const expectedState = makeMockState({recordCollection: []})

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(deleteInvoiceRequested(211))

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('6 dose not replace editedItemId if already editing another row ', () => {

    const mockedInitialState = makeMockState({
      editedItemId: 300
    })

    const expectedState = makeMockState({
      editedItemId: 300
    })

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(invoiceEditStartRequested(67))

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('7 replace editedItemId if its null', () => {

    const mockedInitialState = makeMockState({
      editedItemId: null
    })

    const expectedState = makeMockState({
      editedItemId: 300
    })

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(invoiceEditStartRequested(300))

    // get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

  test('8 nulls editedItemId if the edited item is deleted', () => {

    const mockedRecord = utils.createRecordWithId(300, 'lamp', 1, 44)

    const mockedInitialState = makeMockState({
      editedItemId: 300,
      recordCollection: [mockedRecord]
    })

    const expectedState = makeMockState({
      editedItemId: null,
      recordCollection: []
    })

    const store = storeFactory(mockedInitialState)

    //dispatch an action with input
    store.dispatch(deleteInvoiceRequested(300))

    //get the state
    const newState = store.getState()

    expect(newState).toEqual(expectedState) //toEqual dose a deep comparison

  })

})
