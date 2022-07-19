const bcrypt = require('bcrypt');
const UserService = require('../services/user.services');
const userService = require('../services/user.services')

const AuthController = {};

AuthController.register = async (req, res) => {
  const username = req.body.username.toLowerCase()
  const password = req.body.password;
  const user = await userService.getUser(username)
  const saltRounds = 10
  if (user) { res.status(400).send('Account is exist') }
  else {
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = {
      username: username,
      password: hashPassword,
    }

    const createUser = userService.createUser(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send('Error in process register account')
    }

    return res.status(200).send({ username })
  }
}
AuthController.login = async (req, res) => {
  const username = req.body.username.toLowerCase()
  const password = req.body.password;

  const user = await userService.getUser(username)

  if (!user) res.status(400).send('Account is not exist')

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Password incorrect');
  }

  return res.json({
    msg: 'Login success',
    user: user.username
  });
}


module.exports = AuthController