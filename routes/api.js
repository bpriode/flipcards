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

//get all decks
router.get("/api/user", passport.authenticate('basic', {session: false}), function(req, res) {
  Deck.findAll({
    order: [['createdAt', 'Desc']],
    include: [
      {model: User, as: 'user'},
      {model: Card, as: 'cards'}
    ]
  })
  .then(function(data) {
    res.send(data)
  })
  .catch(function(err){
    res.send(err)
  })
});

module.exports = router;
