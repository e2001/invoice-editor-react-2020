import React from 'react'
import propTypes from 'prop-types'
import cx from "classnames"
import {faEditIcon, faExclamationIcon, faTrashIcon, faUndoIcon} from "../action-icons/action-icons"

import invoicesService from "../../service/invoices.service"
import InvoiceInput from "../invoice-input/invoice-input"
import ActionItem from "../action-item/action-item"
import InvoiceRowTemplate from "../invoice-row-template/invoice-row-template"

import "./invoice-row.scss"

class InvoiceRow extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {}
  }

  static getStateObjectFromRecord(record) {

    const title = record ? record.title : ''
    const count = record ? record.count : -1
    const price = record ? record.price : -1
    const initial = record ? record.initial : true
    const valid = invoicesService.isRecordValid({
      title,
      count,
      price
    })

    return {
      title,
      count,
      price,
      initial,
      valid
    }
  }

  static getDerivedStateFromProps(props, state) {

    if (Object.keys(state).length === 0 || !props.isInEditMode) {
      //Note: we read the props if we are not in edit mode
      return {
        ...InvoiceRow.getStateObjectFromRecord(props.record),
        dirty: false
      }
    }
    return null
  }


  handelUndoChanges = () => {
    if (this.props.onUndoEdit) {
      this.props.onUndoEdit(this.props.record.id)
    }
  }

  handleInputChange = (event) => {

    event.preventDefault()

    if (!this.props.isInEditMode) {
      return
    }

    const target = event.target
    let value = target.value
    const name = target.name

    this.setState({
      [name]: value,
      dirty: true,
      valid: invoicesService.isRecordValid({
        title: this.state.title,
        count: this.state.count,
        price: this.state.price,
        [name]: value
      })
    })
  }

  handelSaveChanges = (event) => {
    event.preventDefault()

    if (!this.state.valid) {
      return
    }

    if (this.props.onRowSaved) {
      this.props.onRowSaved({
        id: this.props.record.id,
        title: this.state.title,
        count: +this.state.count,
        price: +this.state.price
      })
    }
  }

  handelRemove = (event) => {
    event.preventDefault()

    if (this.props.onRowRemove) {
      this.props.onRowRemove(this.props.record.id)
    }
  }

  handelEdit = (event) => {
    event.preventDefault()

    if (this.props.onRowEdited) {
      this.props.onRowEdited(this.props.record.id)
    }
  }

  handelFocus = (event) => {
    event.preventDefault()
    //Note: when focus occurs in an input, we handel it like an Edit
    this.handelEdit(event)
  }

  render() {

    const {record, isInEditMode} = this.props

    const totalCost = invoicesService.getRecordTotalCostOrDefault(this.state.count, this.state.price, '')

    const editButton = <button data-test='edit-button' tabIndex="-1" onClick={this.handelEdit}>{faEditIcon}</button>
    const undoButton = <button data-test='undo-button' tabIndex="-1" onClick={this.handelUndoChanges}>{faUndoIcon}</button>
    const saveButton = <button data-test='save-button' tabIndex="-1" onClick={this.handelSaveChanges}>save</button>
    const deleteButton = <button data-test='delete-button' tabIndex="-1" onClick={this.handelRemove}>{faTrashIcon}</button>

    const titleInput = <InvoiceInput
      tabIndex={isInEditMode ? "1" : "-1"}
      readOnly={!isInEditMode}
      name="title"
      type="text"
      placeholder="[ New Item ]"
      hidePlaceholder={isInEditMode}
      hideValue={record.initial && !isInEditMode}
      value={this.state.title}
      onFocus={this.handelFocus}
      onChange={this.handleInputChange}/>

    const countInput = <InvoiceInput
      tabIndex={isInEditMode ? "2" : "-1"}
      readOnly={!isInEditMode}
      name="count"
      type="number"
      placeholder="[ Count ]"
      hidePlaceholder={isInEditMode}
      hideValue={record.initial && !isInEditMode}
      onFocus={this.handelFocus}
      value={this.state.count}
      onChange={this.handleInputChange}/>

    const priceInput = <InvoiceInput
      tabIndex={isInEditMode ? "3" : "-1"}
      readOnly={!isInEditMode}
      hideValue={record.initial && !isInEditMode}
      name="price"
      prefix="price"
      type="number"
      placeholder="[ Price ]"
      hidePlaceholder={isInEditMode}
      onFocus={this.handelFocus}
      value={this.state.price}
      onChange={this.handleInputChange}/>

    const totalInput = <InvoiceInput
      tabIndex="-1"
      readOnly={true}
      disabled="disabled"
      hideValue={record.initial && !isInEditMode}
      prefix="price"
      name="total"
      type="text"
      placeholder="[ Total ]"
      hidePlaceholder={isInEditMode}
      value={totalCost}
    />

    return (
      <div data-test='row-container' className={cx({"row-container":true,"in-edit":isInEditMode})}>
        <InvoiceRowTemplate
          actionsLeft={<>
            {isInEditMode ? <ActionItem className='edit-icon'>{faEditIcon}</ActionItem> : null}
            {!isInEditMode ? <ActionItem>{editButton}</ActionItem> : null}
            {!this.state.valid && this.state.dirty ?
              <ActionItem title='row has some invalid data' dataTest='invalid-icon'>{faExclamationIcon}</ActionItem> : null}
            {isInEditMode ? <ActionItem>{undoButton}</ActionItem> : null}
            {(this.state.dirty && this.state.valid) ? <ActionItem>{saveButton}</ActionItem> : null}
          </>}
          title={titleInput}
          count={countInput}
          price={priceInput}
          total={totalInput}
          actionsRight={<ActionItem>{deleteButton}</ActionItem>}
        />
      </div>
    )
  }
}

InvoiceRow.propTypes = {
  record: propTypes.shape({
    id: propTypes.string.isRequired
  }).isRequired,
  isInEditMode: propTypes.bool,
  onRowSaved: propTypes.func,
  onRowEdited: propTypes.func,
  onRowRemove: propTypes.func,
  onUndoEdit: propTypes.func
}

export default InvoiceRow

