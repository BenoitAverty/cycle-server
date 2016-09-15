import winston from 'winston';

export default function cycleApp(sources) {
  sources.server.subscribe(req =>
    winston.info(`Inside the cycle app: Received request ${req}`)
  );

  return {
    server: sources.server.mapTo(null),
  };
}
