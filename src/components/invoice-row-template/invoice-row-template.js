import React from 'react'
import propTypes from 'prop-types'

import "./invoice-row-template.scss"


function InvoiceRowTemplate({actionsLeft, title, count, price, total, actionsRight}) {

  return (
    <div className="header-row-template">
      <div className={"row-column actions-left"}>
        {actionsLeft}
      </div>
      <div className={"row-column data"}>
        {title}
      </div>
      <div className={"row-column data"}>
        {count}
      </div>
      <div className={"row-column data"}>
        {price}
      </div>
      <div className={"row-column data"}>
        {total}
      </div>
      <div className={"row-column actions-right"}>
        {actionsRight}
      </div>
    </div>

  )

}

InvoiceRowTemplate.propTypes = {
  actionsLeft: propTypes.element,
  title: propTypes.any,
  count: propTypes.any,
  price: propTypes.any,
  total: propTypes.any,
  actionsRight: propTypes.element
}

export default InvoiceRowTemplate

