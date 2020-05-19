dbPassword =
  /** Set connection string here:
   *
   * Copy / paste from MongoDB Atlas:
   * 'mongodb+srv://<user>:'
   * encodeURIComponent('<pass>') +
   * '@<host>.mongodb.net/<mydatabase>?retryWrites=true&w=majority'
   *
   * Template from Mongoose documentation (https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect):
   * mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/mydatabase
   *
   */

  module.exports = {
    mongoURI: dbPassword
  }
