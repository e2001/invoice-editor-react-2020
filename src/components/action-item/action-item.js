import React from "react"
import cx from "classnames"


function ActionItem({dataTest,className,children,...rest}){
  return <div {...rest} data-test={dataTest} className={cx("action-item",className)}>
    {children}
  </div>
}

export default ActionItem

