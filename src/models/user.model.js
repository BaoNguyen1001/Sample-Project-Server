const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 20,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
})

UserSchema.set('timestamps', true)

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel