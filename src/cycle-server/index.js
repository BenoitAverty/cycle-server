import Cycle from '@cycle/rxjs-run';
import RxJSAdapter from '@cycle/rxjs-adapter';
import Rx from 'rxjs';
import winston from 'winston';

export default function makeCycleMiddleware(cycleApp, drivers) {
  const source = new Rx.Subject();

  drivers;
  function serverDriver() {
    return source;
  }
  serverDriver.streamAdapter = RxJSAdapter;

  Cycle.run(cycleApp, {
    server: serverDriver,
  });

  return function cycleMiddleware(req, res) {
    winston.info(`Inside the middleware: received request ${req}`);

    source.next(req);

    res.send('Hello, World!');
  };
}
