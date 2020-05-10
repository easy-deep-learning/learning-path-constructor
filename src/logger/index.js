const createLogger = require('pino')

/**
 * @see https://github.com/pinojs/pino/blob/master/docs/api.md
 *
 * levels: 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'
 */
let options = {
  nestedKey: 'msg',
}

if (process.env.NODE_ENV === 'development') {
  options.prettyPrint = {
    // https://www.npmjs.com/package/dateformat
    translateTime: "yyyy-mm-dd'T'HH:MM:ss:l",
  }

  options.level = 'trace'
}

if (process.env.NODE_ENV === 'production') {
  options.level = 'info'
}

const logger = createLogger(options)
module.exports.logger = logger
