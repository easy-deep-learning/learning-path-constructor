module.exports = (server) => {
  /**
   * create One
   */
  require('./create')(server)

  /**
   * read All
   */
  require('./readAll')(server)

  /**
   * read One
   */
  require('./readOne')(server)

  /**
   * update One
   */
  require('./update')(server)

  /**
   * TODO: delete One (or 'Archive')
   */
}
