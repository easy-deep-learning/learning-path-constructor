const { nanoid } = require('nanoid')
const fp = require('fastify-plugin')
const SessionModel = require('../models/SessionModel')

const sessionCookieName = process.env.COOKIE_SESSION_NAME
const cookieMaxAge = 7 * 24 * 60 * 60 * 1000 // one week

module.exports = fp(
  function (fastify, opts, done) {
    fastify.register(require('fastify-cookie'))

    fastify.addHook('onRequest', async function decodeSession(request) {
      const cookie = request.cookies[sessionCookieName]

      if (!cookie) {
        const sessionId = await createNewSession({
          host: request.ip,
          userAgent: request.headers['user-agent'],
        })
        request.session = {
          sessionId,
          changed: true,
        }
        return
      }

      if (cookie) {
        await SessionModel.findOne({
          sessionCookieId: cookie,
        }).then((session) => {
          if (session && session.isActive) {
            request.session = session
          } else {
            const sessionId = createNewSession({
              host: request.ip,
              userAgent: request.headers['user-agent'],
            })
            request.session = {
              sessionId,
              changed: true,
            }
          }
        })
      }
    })

    fastify.addHook('onSend', (request, reply, payload, next) => {
      const session = request.session

      if (session && session.changed) {
        reply.clearCookie(sessionCookieName)

        reply.setCookie(sessionCookieName, session.sessionId, {
          maxAge: cookieMaxAge,
          path: '/',
        })
        next()
      } else {
        next()
      }
    })

    // end plugin
    done()
  },
  {
    fastify: '3.x',
    name: 'mongodb-sessions',
  }
)

/**
 * Create new session in DB and return this session id
 *
 * @param {String} userAgent
 * @param {String} host
 * @return {String} sessionId
 */
async function createNewSession({ userAgent, host }) {
  const sessionId = nanoid()

  const sessionDocument = new SessionModel({
    sessionCookieId: sessionId,
    isActive: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userAgent: userAgent,
    host: host,
  })

  await sessionDocument.save()

  // Don't wait sessionDocument.save
  return sessionId
}
