const addStrategyFacebook = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '',
    clientSecret: '',
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
