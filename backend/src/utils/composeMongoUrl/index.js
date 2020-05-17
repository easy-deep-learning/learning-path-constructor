const internalIp = require('internal-ip')

/**
 * Compose mongo db connection url
 * @returns {Promise<string>}
 */
module.exports = async () => {
  const hostIp = await internalIp.v4()
  const {
    APP_MONGO_USER,
    APP_MONGO_PASS,
    MONGO_PORT,
    APP_MONGO_DB,
  } = process.env

  return `mongodb://${APP_MONGO_USER}:${APP_MONGO_PASS}@${hostIp}:${MONGO_PORT}/${APP_MONGO_DB}`
}
