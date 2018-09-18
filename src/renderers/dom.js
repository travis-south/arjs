import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';
import StateApi from '../StateApi';

const store = new StateApi(window.initialData);

ReactDOM.hydrate(
  <App store={store}/>,
  document.getElementById('root')
);
