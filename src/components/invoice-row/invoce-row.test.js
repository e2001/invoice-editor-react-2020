import React from 'react'
import {shallow, mount} from 'enzyme'
import {
  checkProps,
  findByTestAttr,
  makeMockState,
  storeFactory
} from "../../test-utils/test-utils"

import utils from "../../utils/utils"
import InvoiceRow from "./invoice-row"
import Provider from "react-redux/lib/components/Provider"


const setupMount = (props = {}) => {

  const recordCollection = [
    utils.createRecord('book1', 1, 10),
    utils.createRecord('book2', 2, 11)
  ]
  const mockedInitialState = makeMockState({recordCollection})
  const store = storeFactory(mockedInitialState)

  //for connected component we need a Provider to pass in store
  const wrapper = mount(
    <Provider store={store}><InvoiceRow {...props} /></Provider>
  )

  return wrapper
}


const setup = (props = {}) => {
  const wrapper = shallow(<InvoiceRow {...props} />)
  //console.log(wrapper.debug())
  return wrapper
}

describe('1 render', () => {

  test('1 render component without error', () => {

    const mockRecord = utils.createRecord('book1', 1, 10);

    const wrapper = setup({record: mockRecord})

    const component = findByTestAttr(wrapper, 'row-container')
    expect(component.length).toBe(1)
  })

  test('2 does not throw warning with a new record props', () => {
    const mockRecord = utils.createRecord()
    checkProps(InvoiceRow, {record: mockRecord})
  })
})

describe('2 action creators', () => {
  let mockRecord

  beforeEach(() => {

  })

  test('1 onRowRemove was called with correct args', () => {

    const onRowRemovedMock = jest.fn()
    const mockRecordId = '88'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 10)

    const wrapper = setupMount({
      onRowRemove: onRowRemovedMock,
      record: mockRecord
    })

    const deleteButton = findByTestAttr(wrapper, 'delete-button')
    deleteButton.simulate('click', {preventDefault() {}})

    expect(onRowRemovedMock.mock.calls.length).toBe(1)

    const onRowRemovedMockArg = onRowRemovedMock.mock.calls[0][0]
    expect(onRowRemovedMockArg).toBe(mockRecordId)

  })

  test('2 onUndoEdit was called with correct args', () => {

    const onUndoEditMock = jest.fn()
    const mockRecordId = '99'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 10)

    const wrapper = setupMount({
      isInEditMode: true,
      onUndoEdit: onUndoEditMock,
      record: mockRecord
    })

    const undoButton = findByTestAttr(wrapper, 'undo-button')
    undoButton.simulate('click', {preventDefault() {}})

    expect(onUndoEditMock.mock.calls.length).toBe(1)

    const onUndoEditMockArg = onUndoEditMock.mock.calls[0][0]
    expect(onUndoEditMockArg).toBe(mockRecordId)

  })

  test('3 onRowEdited is called when an input is focused', () => {

    const onRowEditedMock = jest.fn()
    const mockRecordId = '111'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 10)

    const wrapper = setupMount({
      isInEditMode: true,
      onRowEdited: onRowEditedMock,
      record: mockRecord
    })

    const titleInput = findByTestAttr(wrapper, 'invoice-input-title')
    titleInput.simulate('focus', {preventDefault() {}})

    expect(onRowEditedMock.mock.calls.length).toBe(1)

    const onRowEditedMockArg = onRowEditedMock.mock.calls[0][0]
    expect(onRowEditedMockArg).toBe(mockRecordId)

  })

  test('4 onRowSaved is called with the correct entered data', () => {

    const onRowSavedMock = jest.fn()
    const mockRecordId = '555'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 3)
    const expectedArg = {
      id: "555",
      count: 2,
      price: 10,
      title: "chair"
    }

    const wrapper = setupMount({
      isInEditMode: true,
      onRowSaved: onRowSavedMock,
      record: mockRecord
    })

    const titleInput = findByTestAttr(wrapper, 'invoice-input-title')
    titleInput.simulate('change', {target: {name: 'title', value: expectedArg.title}})

    const titleCount = findByTestAttr(wrapper, 'invoice-input-count')
    titleCount.simulate('change', {target: {name: 'count', value: expectedArg.count}})

    const titlePrice = findByTestAttr(wrapper, 'invoice-input-price')
    titlePrice.simulate('change', {target: {name: 'price', value: expectedArg.price}})

    const saveButton = findByTestAttr(wrapper, 'save-button')
    saveButton.simulate('click', {preventDefault() {}})

    expect(onRowSavedMock.mock.calls.length).toBe(1)

    const onRowSavedMockArg = onRowSavedMock.mock.calls[0][0]
    expect(onRowSavedMockArg).toEqual(expectedArg)

  })

  test('5 invalid icon is shown if invalid data is entered', () => {

    const onRowSavedMock = jest.fn()
    const mockRecordId = '555'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 3)

    const wrapper = setupMount({
      isInEditMode: true,
      record: mockRecord
    })

    const titleCount = findByTestAttr(wrapper, 'invoice-input-count')
    titleCount.simulate('change', {target: {name: 'count', value: -2}})

    const invalidIcon = findByTestAttr(wrapper, 'invalid-icon')
    expect(invalidIcon.length).toBe(1)

    const saveButton = findByTestAttr(wrapper, 'save-button')
    expect(saveButton.length).toBe(0)
  })

  test('6 price is not shown if invalid count or price is entered', () => {

    const onRowSavedMock = jest.fn()
    const mockRecordId = '555'
    mockRecord = utils.createRecordWithId(mockRecordId, 'book1', 1, 3)

    const wrapper = setupMount({
      isInEditMode: true,
      record: mockRecord
    })

    const titleCount = findByTestAttr(wrapper, 'invoice-input-count')
    titleCount.simulate('change', {target: {name: 'count', value: -2}})

    const TotalInput = findByTestAttr(wrapper, 'invoice-input-total')
    expect(TotalInput.instance().value.length).toBe(0)

  })
})



