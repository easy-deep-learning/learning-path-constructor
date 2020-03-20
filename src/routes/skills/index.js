module.exports = server => server.route({
  method: 'GET',
  path: '/skills',
  handler: (request, h) => {
    return [
      {
        id: 1,
        skill_id: 1,
        name: 'Какие бывают node-js фреймворки'
      },
      {
        id: 2,
        skill_id: 1,
        name: 'Разбор koajs'
      },
      {
        id: 2,
        skill_id: 1,
        name: 'Разбор hapyjs'
      }
    ]
  }
})
