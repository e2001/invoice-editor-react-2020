import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'

import InvoiceRow from "../invoice-row/invoice-row"
import InvoiceRowHeader from "../invoice-row-header/invoice-row-header"
import {
  addRecordRequested, deleteAllEmptyRecordsRequest, deleteInvoiceRequested,
  getRecordsRequested, invoiceEditEndRequested,
  invoiceEditStartRequested,
  saveInvoiceRequested
} from "../../actions/invoice.actions"


import "./invoice-list.scss"


export class UnconnectedInvoiceList extends React.Component {

  renderList() {

    const {
      recordCollection, editedItemId, onRowEdited,
      onRowSaved, onRowRemove, onUndoEdit
    } = this.props

    if (recordCollection.length === 0) {
      return <div className='row-message-container'>no records</div>
    } else {
      return recordCollection.map(record => {
        return (
          <InvoiceRow
            key={record.id}
            record={record}
            isInEditMode={record.id === editedItemId}
            onRowEdited={onRowEdited}
            onRowSaved={onRowSaved}
            onRowRemove={onRowRemove}
            onUndoEdit={onUndoEdit}/>
        )
      })
    }
  }

  render() {

    const {loading, deleteAllEmptyRecords, addRecord} = this.props

    return (
      <div data-test="component-input" className={"invoice-list"}>
        <div className="action-bar">
          <button
            tabIndex="-1"
            onClick={() => {deleteAllEmptyRecords()}}>remove empty
          </button>
          <button
            data-test="add-record-btn"
            tabIndex="-1"
            onClick={() => {addRecord()}}>add
          </button>
        </div>
        <div className="record-list-container">
          <div className="record-list-header">
            <InvoiceRowHeader/>
          </div>
          <div data-test="record-list-rows-container" className="record-list-rows-container">
            {loading ? <div data-test="record-list-loading" className='row-message-container'>loading...</div> :
              this.renderList()}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    editedItemId: state.invoiceState.editedItemId,
    loading: state.invoiceState.loading,
    recordCollection: state.invoiceState.recordCollection,
  }
}


const mapDispatchToProps = dispatch => ({
  addRecord: () => dispatch(addRecordRequested()),
  deleteAllEmptyRecords: () => dispatch(deleteAllEmptyRecordsRequest()),
  getRecordsRequested: () => dispatch(getRecordsRequested()),
  onRowEdited: (id) => dispatch(invoiceEditStartRequested(id)),
  onRowSaved: (invoice) => dispatch(saveInvoiceRequested(invoice)),
  onRowRemove: (id) => dispatch(deleteInvoiceRequested(id)),
  onUndoEdit: (id) => dispatch(invoiceEditEndRequested(id))
})

UnconnectedInvoiceList.propTypes = {
  recordCollection: propTypes.array.isRequired,
  addRecord: propTypes.func,
  deleteAllEmptyRecords: propTypes.func,
  getRecordsRequested: propTypes.func,
  onRowEdited: propTypes.func,
  onRowSaved: propTypes.func,
  onRowRemove: propTypes.func,
  onUndoEdit: propTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedInvoiceList)


