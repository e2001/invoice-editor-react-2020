import React from "react"
import {connect} from "react-redux"
import cx from "classnames"
import propTypes from "prop-types"

import utils from "../../utils/utils"

import "./invoice-input.scss"


function InvoiceInput(props) {

  const {
    value, placeholder, hidePlaceholder,
    name, type, prefix, dispatch, hideValue,
    prefixDic, ...rest
  } = props

  const prefixText = prefixDic[prefix]
  const actualValue = (value === null) ? '' : value

  return (
    <div className="input-wrapper">
      {<span className="prefix">{!utils.isStringEmpty(prefixText) ? prefixText:''}</span>}
      <input
        className={cx({'placeholder-hidden-on-focus': hidePlaceholder})}
        data-test={'invoice-input-' + name}
        id={name}
        name={name}
        type={type}
        value={hideValue ? '' : actualValue}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}


InvoiceInput.propTypes = {
  value: propTypes.any,
  placeholder: propTypes.string,
  hidePlaceholder: propTypes.bool,
  name: propTypes.string,
  type: propTypes.string,
  prefix: propTypes.string,
  hideValue: propTypes.bool,
  prefixDic: propTypes.object
}

function mapStateToProps(state) {
  return {
    prefixDic: state.appState.prefixDic
  }
}

export default connect(
  mapStateToProps, null
)(InvoiceInput)

