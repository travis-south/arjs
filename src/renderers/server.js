import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import App from '../components/App';
import StateApi from '../StateApi';
import config from '../config';

const serverRender = async () => {

  const rawData = await axios.get(`http://${config.host}:${config.port}/api`);
  const store = new StateApi(rawData.data);

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store}/>
    ),
    initialData: rawData.data,
  };
};

export default serverRender;
