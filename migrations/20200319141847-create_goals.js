module.exports = {
  async up (db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.collection('goals').insert([
      {
        name: 'Сделать API для сайта'
      },
      {
        name: 'Рассказать о себе на английском'
      },
      {
        name: 'Повторить основы react'
      }
    ])
  },

  async down (db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection('goals').deleteMany()
  }
}
