const crypto = require('crypto')
const db = require('../db')

class AuthService {
  login({ email, password }) {
    const user = db.get('user').value()

    if (!user) {
      throw new Error('Не верный логин или пароль')
    }

    const hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 512, 'sha512')
      .toString('hex')

    if (hash === user.hash && user.email === email) {
      return true
    }

    throw new Error('Не верный логин или пароль')
  }
}

module.exports = new AuthService()