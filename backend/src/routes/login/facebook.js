const axios = require('axios').default
const oauthPlugin = require('fastify-oauth2')

const UserModel = require('../../models/UserModel')

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

      // TODO: save user ID and email to session
      axios({
        method: 'get',
        url: 'https://graph.facebook.com/v6.0/me',
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      })
        .then((response) => {
          reply.send({ token, me: response.data })
        })
        .catch((error) => {
          reply.send({ token, error })
        })
    },
  })
}
