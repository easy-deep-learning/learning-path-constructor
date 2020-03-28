const SkillModel = require('../src/models/SkillModel')

module.exports = {
  async up() {
    await SkillModel.insertMany([
      {
        name: 'Уметь выбирать node-js фреймворк по критериям',
      },
      {
        name: 'Уметь выбирать базу данных по критериям',
      },
      {
        name: 'Уметь настроить окружение разработчика',
      },
    ])
  },

  async down() {
    await SkillModel.deleteMany()
  },
}
