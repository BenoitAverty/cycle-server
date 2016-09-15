import express from 'express';
import winston from 'winston';

// This would be a npm package
import makeCycleMiddleWare from './cycle-server';

// This is the app.
import cycleApp from './cycle-app';

// Create the app
const app = express();

// create the middleWare. This will also run the app ?
const otherDrivers = {
  // drivers (HTTP, mongo...)
};
const cycleMiddleWare = makeCycleMiddleWare(cycleApp, otherDrivers);

app.use('/api', cycleMiddleWare);

app.listen(3000, () => {
  winston.info('Example app listening on port 3000!');
});
