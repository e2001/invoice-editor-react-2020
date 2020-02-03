
import {connect} from "react-redux"
import React, {useEffect} from 'react'
import logo from '../assets/logo.svg';
import {getApplicationDataRequested} from "../actions/app.actions"
import InvoiceEditor from "./invoice-editor-page/invoice-editor-page"

import '../css/app.scss';


function App({getApplicationData}) {

  useEffect(() => {
    getApplicationData()
  }, [])

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>Welcome to Invoice Editor</h4>
        </div>
        { /* Insert your code here */}
        <InvoiceEditor/>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  getApplicationData: () => dispatch(getApplicationDataRequested())
})

export default connect(
  null,
  mapDispatchToProps
)(App)

