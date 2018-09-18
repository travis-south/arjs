import express from 'express';
import config from './config';

const app = express();

app.use(express.static('dist'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.port, function listenHandler(){
  console.info(`Running on ${config.port}`);
  console.info('kaboom');
});
