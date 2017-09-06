const express  = require("express");
const models   = require("../models/index")
const bcrypt   = require("bcrypt");
const passport = require('passport');

const router  = express.Router();

const isAuthenticated = function (req, res, next) {
req.isAuthenticated();
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

  router.get("/", function(req, res) {
    res.render("login", {
        messages: res.locals.getMessages()
    });
  });

  router.post('/', passport.authenticate('local', {
      successRedirect: '/user',
      failureRedirect: '/',
      failureFlash: true
  }));

  router.get("/login", function(req, res) {
    res.render("login");
  });

  router.post("/login", function(req, res) {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
      req.flash('error', "Please, fill in all the fields.")
      res.redirect('/login')
    }

    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(password, salt)

    let newUser = {
      username: username,
      salt: salt,
      passwordhash: hashedPassword
    }

    models.User.create(newUser).then(function() {
      res.redirect('/')
    }).catch(function(error) {
      req.flash('error', "Please, choose a different username.")
      res.redirect('/login')
    });
  });







  module.exports = router;
