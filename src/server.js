import express from 'express';
import config from './config';

import serverRender from './renderers/server';
import {data} from '../dist/testData';

const app = express();

app.use(express.static('dist'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
  const initialContent = await serverRender();
  res.render('index-' + app.get('env'), { ...initialContent });
});

app.get('/api', (req, res) => {
  res.send(data);
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}`);
});
