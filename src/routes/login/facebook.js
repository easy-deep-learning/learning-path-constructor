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

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        )

        // Set the `sessionId` cookie
        // Save `sessionId` to DB
        // Bind User with sessionId
      },
    },
  })
}
