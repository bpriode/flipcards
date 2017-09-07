const express  = require("express");
const passport = require('passport');
const BasicStrategy     = require('passport-http').BasicStrategy;
const router  = express.Router();

// const user = {
//   id: 1,
//   username: "Bethany"
// }

//auth to access API
router.get('/api/login', passport.authenticate('basic', {session: false}), function(req, res) {
  res.status(200).send('Here is my Flipcard API')
})


module.exports = router;
