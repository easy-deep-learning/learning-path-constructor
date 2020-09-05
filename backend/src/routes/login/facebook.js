const oauthPlugin = require('fastify-oauth2')

module.exports = (fastify) => {
  console.log('facebookOAuth2') // eslint-disable-line

  fastify.register(oauthPlugin, {
    name: 'facebookOAuth2',
    credentials: {
      client: {
        id: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_ID,
        secret: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_SECRET,
      },
      auth: oauthPlugin.FACEBOOK_CONFIGURATION,
    },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/facebook',
    // facebook redirect here after the user login
    callbackUri: 'http://localhost:3001/login/facebook/callback',
  })

  fastify.route({
    method: 'GET',
    path: '/login/facebook/callback',

    handler: async function (request, reply) {
      const token = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request
      )

      console.log(token.access_token)

      // if later you need to refresh the token you can use
      // const newToken = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)

      reply.send({ access_token: token.access_token })
    },
  })
}
