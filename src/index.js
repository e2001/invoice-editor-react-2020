import React from 'react';
import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';

import 'font-awesome/css/font-awesome.min.css';
import './css/index.scss';

import App from './components/app';
import store from './configure-store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root'));
