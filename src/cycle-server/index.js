import Cycle from '@cycle/rxjs-run';
import RxJSAdapter from '@cycle/rxjs-adapter';
import Rx from 'rxjs';
import winston from 'winston';

const linkedResponseSymbol = Symbol('linked response');

export default function makeCycleMiddleware(cycleApp, drivers) {
  const source = new Rx.Subject();

  drivers;
  function serverDriver(sink) {
    sink.subscribe(({ req, data }) => {
      req[linkedResponseSymbol].send(JSON.stringify(data));
    });

    return source;
  }
  serverDriver.streamAdapter = RxJSAdapter;

  Cycle.run(cycleApp, {
    server: serverDriver,
  });

  return function cycleMiddleware(req, res) {
    winston.info(`Inside the middleware: received request ${req}`);

    const reqCopy = {
      ...req,
      [linkedResponseSymbol]: res,
    };

    source.next(reqCopy);
  };
}
