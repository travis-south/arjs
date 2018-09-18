import express from 'express';
import config from './config';

const app = express();

app.use(express.static('dist'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}`);
});
