import React from 'react'
import InvoiceRowTemplate from "../invoice-row-template/invoice-row-template"

import "./invoice-row-header.scss"



function InvoiceRowHeader() {

  return (
    <div className='invoice-row-header-x'>
      <InvoiceRowTemplate
        title={'Title'}
        count={'Qty'}
        price={'Price'}
        total={'Total'}
      />
    </div>
  )
}


export default InvoiceRowHeader

