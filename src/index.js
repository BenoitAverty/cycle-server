import express from 'express';
import winston from 'winston';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  winston.info('Example app listening on port 3000!');
});
