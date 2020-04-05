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
   * TODO: read One
   */

  /**
   * update One
   */
  require('./update')(server)

  /**
   * TODO: delete One (or 'Archive')
   */
}
