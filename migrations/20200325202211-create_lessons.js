module.exports = {
  async up(db, client) {
    await db.collection('lessons').insert([
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

  async down(db, client) {
    await db.collection('lessons').deleteMany()
  },
}
