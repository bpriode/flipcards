const express  = require("express");
const passport = require('passport');
const Deck = require('../models/deck');
const User = require('../models/user');
const Card = require('../models/card')
const BasicStrategy     = require('passport-http').BasicStrategy;
const router  = express.Router();



//auth to access API
router.get('/api/login', passport.authenticate('basic', {session: false}), function(req, res) {
  res.status(200).send('Here is my Flipcard API')
})

//get all users
router.get("/user", passport.authenticate('basic', {session: false}), function(req, res) {
  Deck.findAll({
    order: [['createdAt', 'Desc']],
    include: [
      {model: models.User, as: 'user'},
      {model: models.Card, as: 'cards'}
    ]
  }).then(function(decks) {
    res.render('user', {decks: decks})
  })
  .catch(function(err){
    res.send(err)
  })
});

module.exports = router;
