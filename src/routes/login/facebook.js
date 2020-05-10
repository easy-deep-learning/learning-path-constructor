const { nanoid } = require('nanoid')
const SessionModel = require('../../models/SessionModel')
const UserModel = require('../../models/UserModel')
const { logger } = require('../../logger')

const addStrategyFacebook = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: process.env.COOKIE_ENCRYPTION_PASSWORD_SECURE,
    isSecure: false,
    clientId: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_SECRET,
    location: server.info.uri,
  })
}

module.exports = (server) => {
  addStrategyFacebook(server)

  server.route({
    method: '*',
    path: '/login/facebook',
    config: {
      auth: {
        strategy: 'facebook',
        mode: 'try',
      },
      handler: async (request, h) => {
        // Create session
        const sessionId = nanoid()
        const sessionDocument = new SessionModel({
          sessionCookieId: sessionId,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          userAgent: request.headers['user-agent'],
          host: request.headers.host,
        })
        const profile = request.auth.credentials.profile

        try {
          let userDocument = await UserModel.findOne({
            email: profile.email,
          }).exec()

          if (!userDocument.isNew) {
            userDocument.sessions.push(sessionDocument._id)
          } else {
            userDocument = new UserModel({
              displayName: profile.displayName,
              email: profile.email,
              picture: profile.picture.data.url,
              oauth: {
                facebookId: profile.id,
              },
              sessions: [sessionDocument._id],
            })
          }

          sessionDocument.userId = userDocument._id

          const [, sessionUser] = await Promise.all([
            sessionDocument.save(),
            userDocument.save(),
          ])

          h.state('sessionId', sessionId)
          return h.redirect(`/profile/${sessionUser._id}`)
        } catch (error) {
          logger.error(error)
          return h.redirect('/login/facebook')
        }
      },
    },
  })
}
