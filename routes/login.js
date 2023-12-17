const express = require('express')
const router = express.Router()
const authService = require('../services/auth.service')

router.get('/', (req, res, next) => {
  if (req.session.auth) {
    return res.redirect('/admin')
  }
  res.render('pages/login', { title: 'SigIn page', msglogin: req.flash('login')[0] })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  // const email = req.body.email
  // const password = req.body.password
  // console.log(email);
  // console.log(password);

  // res.send('Реализовать функцию входа по email и паролю')
  const { email, password } = req.body
  try {
    req.session.auth = authService.login({ email, password })
    res.redirect('/admin')
  } catch (error) {
    req.flash('login', error.message)
    return res.redirect('/login')
  }
})

module.exports = router