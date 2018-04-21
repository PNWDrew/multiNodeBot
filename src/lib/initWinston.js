var winston   = require('winston');

winston.configure({
  transports: [
    new (winston.transports.File)({ 
      filename: './somefile.log',
      level: 'warn'
     }),
    new (winston.transports.Console)({
      level: 'warn'
    })
  ]
});

const levels = { 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
}

//winston.level = 'silly';