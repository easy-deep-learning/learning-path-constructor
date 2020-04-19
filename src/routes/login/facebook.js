const { nanoid } = require('nanoid')
const SessionModel = require('../../models/SessionModel')
const UserModel = require('../../models/UserModel')

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
      handler: function (request, h) {
        if (!request.auth.isAuthenticated) {
          return h.redirect('/login/facebook')
        }

        // Create session
        const sessionId = nanoid()
        h.state('sessionId', sessionId)
        const sessionDocument = new SessionModel({
          sessionCookieId: sessionId,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          userAgent: request.headers['user-agent'],
          host: request.headers.host,
        })
        const profile = request.auth.credentials.profile
        let userDocument

        return UserModel.findOne({ email: profile.email })
          .exec()
          .then((user) => {
            if (user) {
              userDocument = user
              sessionDocument.userId = userDocument._id
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

              sessionDocument.userId = userDocument._id
            }
            return Promise.all([sessionDocument.save(), userDocument.save()])
          })
          .then(([, user]) => {
            return h.redirect(`/profile/${user._id}`)
          })
          .catch((error) => {
            console.log('error: ', error) // eslint-disable-line
            // TODO: Add logger
            return h.redirect('/')
          })
      },
    },
  })
}
