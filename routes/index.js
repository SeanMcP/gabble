const express = require('express')
const models = require('../models/index')
const User = require('../models/user');
const Post = require('../models/post')
const router = express.Router()
const bcrypt = require('bcrypt')

const passport = require('passport')

const isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get('/', function(req, res) {
  res.render('index', {
      messages: res.locals.getMessages()
  })
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}))

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    req.flash('error', 'Please, fill in all the fields.')
    res.redirect('signup')
  }

  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)

  let newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }

  models.User.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', 'Please, choose a different username.')
    res.redirect('/signup')
  })
})

router.get('/user', isAuthenticated, function(req, res) {
  console.log('req.user.id: ', req.user.id);
  models.Post.findAll({})
  .then(function(data) {
    res.render('user', { data: data })
    console.log('data:\n', data)
  })
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

router.post('/create', function(req, res) {
  console.log('req.user.id: ', req.user.id);
  models.Post.create({
    user_id: req.user.id,
    content: req.body.content,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
  .then(function(data) {
    res.redirect('/')
  })
})



module.exports = router
