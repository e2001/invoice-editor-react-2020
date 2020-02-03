import {makeMockState, storeFactory} from "../test-utils/test-utils"
import utils from "../utils/utils"
import {selectInvoiceTotalSummery} from "./selectors"
import Record from "../models/record"

describe('1 selectors', () => {

  test('1 correct calculation in selectInvoiceTotalSummery', () => {

    const mockRecordCollection = [
      utils.createRecord('book1', 1, 10),
      utils.createRecord('book2', 2, 100),
      utils.createRecord('book3', 2, 20)
    ]
    const mockedInitialState = makeMockState({
      recordCollection: mockRecordCollection
    }, {
      loaded: true,
      tax: 10
    })

    const expectedResult = {
      skipped: 0,
      subtotal: 250,
      tax: 10,
      taxCharge: 25,
      total: 275
    }

    const store = storeFactory(mockedInitialState)

    //step 4 : get the state
    const newState = store.getState()

    const actualResult = selectInvoiceTotalSummery(newState)

    expect(actualResult).toEqual(expectedResult) //toEqual dose a deep comparison

  })


  test('2 skips new rows and not calculate them ( selectInvoiceTotalSummery )', () => {

    //Note : new rows in the store have 'initial' field set to true
    // to indicate that they have not been edited yet

    const mockRecordCollection = [
      //this is a new row with initial set to true
      //but I added a price and count to capture possible error
      new Record(3, null,4,10,true),
      new Record(5, null,2,20,true),
      utils.createRecord('book2', 1, 100),
      utils.createRecord('book3', 1, 20)
    ]
    const mockedInitialState = makeMockState({
      recordCollection: mockRecordCollection
    }, {
      loaded: true,
      tax: 10
    })

    const expectedResult = {
      skipped: 2,
      subtotal: 120,
      tax: 10,
      taxCharge: 12,
      total: 132
    }

    const store = storeFactory(mockedInitialState)

    const newState = store.getState()

    const actualResult = selectInvoiceTotalSummery(newState)

    expect(actualResult).toEqual(expectedResult) //toEqual dose a deep comparison

  })

  test('3 skips invalid records ( selectInvoiceTotalSummery )', () => {

    const mockRecordCollection = [
      new Record(3, 'book1',-1,10,false),  //invalid record
      new Record(5, 'table',2,'A',false),  //invalid record
    ]
    const mockedInitialState = makeMockState({
      recordCollection: mockRecordCollection
    }, {
      loaded: true,
      tax: 10
    })

    const expectedResult = {
      skipped: 2,
      subtotal: 0,
      tax: 10,
      taxCharge: 0,
      total: 0
    }

    const store = storeFactory(mockedInitialState)

    const newState = store.getState()

    const actualResult = selectInvoiceTotalSummery(newState)

    expect(actualResult).toEqual(expectedResult) //toEqual dose a deep comparison

  })

})
