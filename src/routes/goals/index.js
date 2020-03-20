module.exports = server => server.route({
  method: 'GET',
  path: '/goals',
  handler: (request, h) => {
    return [
      {
        id: 1,
        name: 'Сделать API для сайта'
      },
      {
        id: 2,
        name: 'Рассказать о себе на английском'
      },
      {
        id: 3,
        name: 'Повторить основы react'
      }
    ]
  }
})
