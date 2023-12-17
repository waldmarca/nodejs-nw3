const express = require('express')
const router = express.Router()
const db = require('../db')
const data = {
  skills: db.get('skills').value(),
  products: db.get('products').value(),
}
const nodemailer = require('nodemailer')
const configMail = require('../config.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', {
    title: 'Main page',
    ...data,
    msgemail: req.flash('mail')[0],
  })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  // res.send('Реализовать функционал отправки письма')
  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash('mail', 'Необходимо заполнить все поля')
    return res.redirect('/#mail')
  }
  const transporter = nodemailer.createTransport(configMail.mail.smtp)
  const msgMail = {
    from: req.body.name,
    to: configMail.mail.smtp.auth.user,
    subject: configMail.mail.subject,
    text: req.body.message,
  }
  transporter.sendMail(msgMail, function (error, info) {
    if (error) {
      req.flash(
        'mail',
        'При отправке письма произошла ошибка, попробуйте отправить письмо ещё раз'
      )
      return res.redirect('#/mail')
    }
    req.flash('mail', 'Ваше письмо успешно отправлено')
    return res.redirect('/#mail')
  })
})

module.exports = router