const express = require('express')
const models = require('../models/index')
const User = require('../models/user');
const Post = require('../models/post')
const router = express.Router()
const bcrypt = require('bcrypt')

const passport = require('passport')

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get('/', function(req, res) {
  res.render('index', {
      user: req.user,
      messages: res.locals.getMessages()
  })
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}))

router.get('/login', function(req, res) {
  res.render('index', {
    user: req.user,
    messages: res.locals.getMessages()
  })
})

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  let username = req.body.username
  let password = req.body.password
  let confirm = req.body.confirm
  let name = req.body.name

  if (!username || !password) {
    req.flash('error', 'Please, fill in all the fields.')
    res.redirect('/signup')
  } else if (password !== confirm) {
    req.flash('error', 'Passwords to not match.')
    res.redirect('/signup')
  } else {

    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password, salt)

    let newUser = {
      name: name,
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

  }
})

router.get('/user', isAuthenticated, function(req, res) {
  models.Post.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: models.User, as: 'user' },
      { model: models.Like, as: 'likes' }
    ]
  })
  .then(function(data) {
    res.render('user', { data: data })
  })
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

router.post('/create', function(req, res) {
  models.Post.create({
    userId: req.user.id,
    content: req.body.content
  })
  .then(function(data) {
    res.redirect('/user')
  })
})

router.get('/gab/:id', function(req, res) {

  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.User, as: 'user' },
      { model: models.Like, as: 'likes' }
    ]
  })
  .then(function(data) {
    let arr = [];

    data.likes.forEach(function(like){ arr.push(like.userId) })

    models.User.findAll({ where: { id: arr } })
    .then(function(users) {
      if (!req.user) {
        res.render('gab', { data: data, users: users })
      } else if (data.userId == req.user.id) {
        res.render('gab', { data: data, users: users, delete: true })
      } else {
        res.render('gab', { data: data, users: users })
      }
    })

  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/delete/:id', function(req, res) {
  models.Like.destroy({
    where: {
      postId: req.params.id
    }
  })
  .then(function(likes) {
    models.Post.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      res.redirect('/user')
    })
  })
})

router.get('/like/:postId', function(req, res) {
  models.Like.findAll({ where: { postId: req.params.postId } })
  .then(function(data) {

    let arr = []

    data.forEach(function(user) {
      arr.push(user.userId)
    })

    if (!req.user) {
      console.log('Not logged in')
    } else if (!arr.includes(req.user.id)) {
      models.Like.create({
        userId: req.user.id,
        postId: req.params.postId
      })
      res.redirect('/user')
    }
  })
})

router.get('/:username', function(req, res) {
  models.User.findOne({
    where: {
      username: req.params.username
    },
    include: [
      { model: models.Post, as: 'posts' }
    ]
  })
  .then(function(data) {
    // console.log('The data.posts[0].content:\n', data.posts[0].content);
    if(!req.user) {
      res.render('profile', { data: data , posts: data.posts })
    } else if (req.user.username == req.params.username) {
      res.render('profile', { data: data , posts: data.posts, owner: true })
    } else {
      res.render('profile', { data: data , posts: data.posts })
    }
  })
})



module.exports = router
