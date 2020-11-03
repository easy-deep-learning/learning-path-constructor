const axios = require('axios').default
const oauthPlugin = require('fastify-oauth2')

const SessionModel = require('../../models/SessionModel')
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
    callbackUri: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_CALLBACK_URI,
  })

  fastify.route({
    method: 'GET',
    path: '/login/facebook/callback',

    handler: async function (request, reply) {
      const token = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request
      )

      const response = await axios({
        method: 'get',
        url: 'https://graph.facebook.com/v6.0/me',
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      }).catch((error) => {
        reply.send({ token, error })
      })

      const session = await SessionModel.findOne({
        sessionCookieId: request.session.sessionCookieId,
        isActive: true,
      })

      if (!session) {
        reply.code(500).send()
      }

      let user = await UserModel.findOne({
        'oauth.facebookId': response.data.id,
      })

      if (!user) {
        user = await new UserModel({
          displayName: response.data.name,
          email: 'TODO: get from FB',
          picture: 'TODO: get from FB',
          oauth: {
            facebookId: response.data.id,
          },
        }).save()
      }

      session.userId = user._id
      session.isActive = true
      session.save()

      /**
       * "me": {
       *   "name": "Alex Baumgertner",
       *   "id": "2902425913209697"
       * }
       */
      reply.send({ token, me: user })
    },
  })
}
