import React from 'react'
import {shallow} from 'enzyme'
import {
  checkProps,
  findByTestAttr,
  makeMockState,
  makeMockStateShallow,
  storeFactory
} from "../../test-utils/test-utils"
import InvoiceList, {UnconnectedInvoiceList} from './invoice-list'
import utils from "../../utils/utils"
import {initialStoreState} from "../../reducers"


const setup = (initialState = initialStoreState) => {
  const store = storeFactory(initialState)

  //for connected component  we need to pass in a prop named 'store'
  const wrapper = shallow(<InvoiceList store={store}/>).dive().dive()
  //we use .dive().dive() to get our component

  return wrapper
}

describe('1 render', () => {
  let wrapper

  test('1 render component without error', () => {
    wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-input')
    expect(component.length).toBe(1)
  })
  test('2 does not throw warning with expected props', () => {
    checkProps(UnconnectedInvoiceList, {recordCollection: []})
  })
  test('3 render correct number of records ', () => {
    const recordCollection = [
      utils.createRecord('book1', 1, 10),
      utils.createRecord('book2', 2, 11)
    ]
    const mockedInitialState = makeMockState({recordCollection})

    wrapper = setup(mockedInitialState)
    const component = findByTestAttr(wrapper, 'record-list-rows-container')
    expect(component.children().length).toBe(recordCollection.length)
  })

  test('4 render loading text', () => {

    const recordCollection = [
      utils.createRecord('book1', 1, 10),
      utils.createRecord('book2', 2, 11)
    ]
    const initialState = makeMockState({
      loading: true,
      recordCollection
    })

    wrapper = setup(initialState)
    const component = findByTestAttr(wrapper, 'record-list-loading')
    expect(component.length).toBe(1)
  })
})

describe('2 redux props', () => {
  let wrapper

  test('1 has recordCollection piece of state as prop', () => {

    const recordCollection = [
      utils.createRecord('book1', 1, 10),
      utils.createRecord('book2', 2, 11)
    ]
    const mockState = makeMockStateShallow({
      recordCollection
    })
    wrapper = setup(mockState)

    /* Note : the recordCollection from redux store is placed onto
       InvoiceList component props via mapStateToProps */
    const recordCollectionProp = wrapper.instance().props.recordCollection

    expect(recordCollectionProp).toBe(recordCollection)
  })

  test('2 `addRecord` action creator is a function prop', () => {
    wrapper = setup()
    const addRecordProp = wrapper.instance().props.addRecord
    expect(addRecordProp).toBeInstanceOf(Function)
  })

})

describe('3 `addRecord` action creator', () => {

  test('`1 addRecord` was called once', () => {

    // create a mock function for `addRecord`
    const addRecordMock = jest.fn()

    // set up UnconnectedInvoiceList, with addRecord as a prop
    const wrapper = shallow(<UnconnectedInvoiceList loading={true} addRecord={addRecordMock}/>)

    // simulate click on the add button
    const addRecordButton = findByTestAttr(wrapper, 'add-record-btn')
    addRecordButton.simulate('click', {preventDefault() {}})

    expect(addRecordMock.mock.calls.length).toBe(1)
  })

})
