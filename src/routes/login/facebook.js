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
    options: {
      auth: {
        strategy: 'facebook',
        mode: 'try',
      },
      handler: function (request) {
        if (!request.auth.isAuthenticated) {
          return 'Authentication failed due to: ' + request.auth.error.message
        }

        return (
          '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>'
        )
      },
    },
  })
}
