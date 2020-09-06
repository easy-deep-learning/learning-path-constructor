const { nanoid } = require('nanoid')
const fp = require('fastify-plugin')
const SessionModel = require('../models/SessionModel')

const cookieName = process.env.COOKIE_SESSION_NAME
const cookieMaxAge = 7 * 24 * 60 * 60 * 1000 // one week

module.exports = fp(
  function (fastify, opts, done) {
    fastify.register(require('fastify-cookie'))

    fastify.addHook('onRequest', function decodeSession(request, reply, next) {
      const cookie = request.cookies[cookieName]

      if (!cookie) {
        const sessionId = createNewSession({
          host: request.ip,
          userAgent: request.headers['user-agent'],
        })
        request.session = {
          sessionId,
          changed: true,
        }
        next()
        return
      }

      if (cookie) {
        SessionModel.findOne({
          sessionCookieId: cookie,
        }).then((session) => {
          if (session && session.isActive) {
            request.session = session
            next()
          } else {
            const sessionId = createNewSession({
              host: request.ip,
              userAgent: request.headers['user-agent'],
            })
            request.session = {
              sessionId,
              changed: true,
            }
            next()
          }
        })
      }
    })

    fastify.addHook('onSend', (request, reply, payload, next) => {
      const session = request.session

      if (session && session.changed) {
        reply.setCookie(cookieName, session.sessionId, {
          maxAge: cookieMaxAge,
        })
        next()
        return
      }

      next()
    })

    // end plugin
    done()
  },
  {
    fastify: '3.x',
    name: 'mongodb-sessions',
  }
)

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

/**
 * Create new session in DB and return this session id
 *
 * @param {String} userAgent
 * @param {String} host
 * @return {String}
 */
function createNewSession({ userAgent, host }) {
  const sessionId = nanoid()

  const sessionDocument = new SessionModel({
    sessionCookieId: sessionId,
    isActive: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userAgent: userAgent,
    host: host,
  })

  sessionDocument.save()

  // Don't wait sessionDocument.save
  return sessionId
}
