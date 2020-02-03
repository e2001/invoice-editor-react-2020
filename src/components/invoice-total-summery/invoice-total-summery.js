import React from 'react'
import {connect} from 'react-redux'
import {selectInvoiceTotalSummery} from "../../actions/selectors"

import "./invoice-total-summery.scss"



function InvoiceTotalSummery({prefixDic, getTotalSummery, appStateLoaded}) {

  const totalSummery = appStateLoaded ? getTotalSummery() : {}

  const summeryRow = (title, data) => {
    return <div className='summery-row'>
      <div>{title}</div>
      <div>{data}</div>
    </div>
  }

  const rowSubtotal = summeryRow('Subtotal :', <>{prefixDic.price}{totalSummery.subtotal}</>)

  const taxRow = summeryRow(<>Tax : ({totalSummery.tax}{prefixDic.percent}): </>,
    <>{prefixDic.price}{totalSummery.taxCharge}</>)

  const grandTotalRow = summeryRow('Grand Total : ', <>{!appStateLoaded ? 'loading....' :
    <span>{prefixDic.price}{totalSummery.total}</span>}</>)

  const skippedMsgRow = <>( Note: calculation skipped : {totalSummery.skipped} rows )</>

  return (
    <div className='total-summery-container'>

      {appStateLoaded ? <>
        {rowSubtotal}
        {taxRow}
      </> : null}
      {grandTotalRow}

      <div className='note-section'>
        {appStateLoaded && totalSummery.skipped > 0 ? skippedMsgRow : null}
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    appStateLoaded: state.appState.loaded,
    prefixDic: state.appState.prefixDic,
    getTotalSummery: () => selectInvoiceTotalSummery(state)
  }
}

export default connect(
  mapStateToProps,
  null
)(InvoiceTotalSummery)
