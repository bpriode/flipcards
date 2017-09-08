const express  = require("express");
const passport = require('passport');
const models   = require("../models/index")
const BasicStrategy     = require('passport-http').BasicStrategy;
const router  = express.Router();



//auth to access API
router.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
  res.status(200).send('Here is my Flipcard API')
})

//get all decks
router.get("/user", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.findAll({})
  .then(function(decks) {
    res.status(200).send(decks)
  })
  .catch(function(err){
    res.send(err)
  })
});

//create a deck
router.post("/user", passport.authenticate('basic', {session: false}), function (req, res) {
  models.Deck.create({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description
  })
  .then(function(deck) {
    res.status(200).send(deck)
  })
  .catch(function(err) {
    res.send(err)
  })
});

// open a deck and see the cards
router.get("/deck/:id", passport.authenticate('basic', {session: false}), function(req, res) {
  models.Deck.findById(req.params.id)
  .then(function(cards) {
    models.Card.findAll({
      where: {deckId: req.params.id},
      include: [
        {model: models.Deck, as: 'deck'}
      ]
    })
    .then(function(cards) {
      res.status(200).send(cards)
    })
    .catch(function(err) {
      res.send(err)
    })
  })
});

//create cards within a deck
router.post("/deck/:deckId", passport.authenticate('basic', {session: false}), function (req, res) {

  models.Card.create({
    deckId: req.params.deckId,
    front: req.body.front,
    back: req.body.back
  })
  .then(function(data) {
    res.status(200).send(data)
  })
  .catch(function(err){
    res.send(err)
  })
});

//allows you to delete a card within a deck
router.get('/delete/:deckId', function(req, res, next) {

    models.Card.destroy({
      where: {
        deckId: req.params.deckId
      }
    })
  .then(function(data) {
    res.status(200).send(data)
  })
  .catch(function(err){
    res.send(err)
  })
})

//take a quiz over a deck with cards shuffling randomly
router.get('/deck/:id/quiz', function(req, res) {

  models.Deck.findById(req.params.id)
  .then(function(cards) {
    models.Card.findAll({
      where: {
        deckId: req.params.id
      }
    })
    .then(function(cards){

      let length = cards.length
      let random = [];

      for (var i = 0; i < length; i++) {
        random.push(cards.splice(Math.floor(Math.random()*cards.length), 1)[0]);
      }

      res.status(200).send(cards)
    })
  })
  .catch(funcion(err) {
    res.send(err)
  })






module.exports = router;
