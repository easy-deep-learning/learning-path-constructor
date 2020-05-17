const GoalModel = require('../src/models/GoalModel')

module.exports = {
  async up() {
    await GoalModel.insertMany([
      {
        name: 'Сделать API для сайта',
      },
      {
        name: 'Рассказать о себе на английском',
      },
      {
        name: 'Повторить основы react',
      },
    ])
  },

  async down() {
    await GoalModel.deleteMany()
  },
}
