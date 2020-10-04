const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  oauth: {
    facebookId: String,
  },
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
