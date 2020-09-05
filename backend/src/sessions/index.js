const fp = require('fastify-plugin')

const SessionModel = require('../models/SessionModel')

const SessionStore = {
  set: (sessionId, session, callback) => {
    SessionModel.findOneAndUpdate(
      {
        sessionCookieId: sessionId,
      },
      {
        updatedAt: Date.now(),
      },
      {
        // Create a document if one isn't found. Required
        // for `setDefaultsOnInsert`
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .then(() => {
        callback()
      })
      .catch()
  },
  get: (sessionId, callback) => {
    console.log('get') // eslint-disable-line
    console.log('sessionId: ', sessionId) // eslint-disable-line
    SessionModel.findOne({
      sessionCookieId: sessionId,
    })
      .then((session) => {
        callback(null, session)
      })
      .catch((error) => {
        callback(error)
      })
  },
  destroy: (sessionId, callback) => {
    SessionModel.deleteOne({
      sessionCookieId: sessionId,
    })
      .then(() => {
        callback()
      })
      .catch((error) => {
        callback(error)
      })
  },
}

module.exports = fp(
  function (fastify, opts, done) {
    fastify.register(require('fastify-cookie'))

    fastify.register(require('fastify-session'), {
      cookieName: 'sessionId',
      cookie: { secure: false },
      secret: process.env.COOKIE_ENCRYPTION_PASSWORD_SECURE,
      expires: 1800000,

      store: SessionStore,

      /**
       * Save sessions to the store, even when they are new and not modified.
       * Defaults to true. Setting this to false can be useful to save storage space
       * and to comply with the EU cookie law.
       * @TODO: comply with the EU cookie law
       */
      saveUninitialized: true,
    })

    done()
  },
  {
    fastify: '3.x',
    name: 'mongodb-sessions',
  }
)
