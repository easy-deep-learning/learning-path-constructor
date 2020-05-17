const LessonModel = require('../src/models/LessonModel')

module.exports = {
  async up() {
    await LessonModel.insertMany([
      {
        name: 'Какие бывают node-js фреймворки',
      },
      {
        name: 'Разбор express',
      },
      {
        name: 'Разбор hapyjs',
      },
    ])
  },

  async down() {
    await LessonModel.deleteMany()
  },
}
