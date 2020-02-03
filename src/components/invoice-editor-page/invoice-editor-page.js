import React, {useEffect} from 'react'
import propTypes from "prop-types"
import {connect} from "react-redux"

import InvoiceList from "../invoice-list/invoice-list"
import InvoiceTotals from "../invoice-total-summery/invoice-total-summery"
import {getRecordsRequested} from "../../actions/invoice.actions"

import "./invoice-editor-page.scss"



function InvoiceEditorPage({getRecordsRequested}) {

  useEffect(() => {
    getRecordsRequested()
  }, [])

  return (
    <div className={"invoice-editor-page"}>
      <div children='invoice-list-section'>
        <InvoiceList/>
      </div>
      <div children='total-section'>
        <InvoiceTotals/>
      </div>
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  getRecordsRequested: () => dispatch(getRecordsRequested())
})

InvoiceEditorPage.propTypes = {
  getRecordsRequested: propTypes.func
}

export default connect(
  null,
  mapDispatchToProps
)(InvoiceEditorPage)
