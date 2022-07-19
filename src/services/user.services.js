const UserModel = require('../models/user.model')

const UserService = {}

UserService.getUser = async (username) => {
  const result = await UserModel.findOne({ username: username })

  return result;
}

UserService.createUser = async (user) => {
  const result = await UserModel.insertMany(user);

  return result;
}


module.exports = UserService