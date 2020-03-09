module.exports = server => server.route({
  method: 'GET',
  path: '/lessons',
  handler: (request, h) => {
    return [
      {
        id: 1,
        goal_id: 1,
        name: 'Уметь выбирать node-js фреймворк по критериям',
      },
      {
        id: 2,
        goal_id: 1,
        name: 'Уметь выбирать базу данных по критериям',
      },
      {
        id: 2,
        goal_id: 1,
        name: 'Уметь настроить окружение разработчика',
      },
    ]
  },
})
