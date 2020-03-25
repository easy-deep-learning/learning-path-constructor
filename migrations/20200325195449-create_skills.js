module.exports = {
  async up(db) {
    await db.collection('skills').insert([
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

  async down(db) {
    await db.collection('skills').deleteMany()
  },
}
