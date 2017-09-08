const express         = require("express");
const mustacheExpress = require("mustache-express");
const path            = require("path");
const routes          = require("./routes/base");
const api             = require("./routes/api");
const morgan          = require("morgan");
const bodyParser      = require("body-parser");
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const BasicStrategy   = require('passport-http').BasicStrategy;
const session         = require('express-session');
const flash           = require('express-flash-messages');
const models           = require("./models/index");
const bcrypt          = require("bcrypt");

const app  = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan("dev"));

app.use(session({
    secret: 'BP',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

const authenticateUser = function(username, passwordhash, done) {
  models.User.findOne({
    where: {
      'username': username.toLowerCase()
    }
  }).then(function (user) {
    if (user == null) {
      return done(null, false, { message: 'Invalid username and/or password: please try again' })
    }

    let hashedPassword = bcrypt.hashSync(passwordhash, user.salt)

    if (user.passwordhash === hashedPassword) {
      return done(null, user)
    }

    return done(null, false, { message: 'Invalid username and/or password: please try again' })
  })
}

passport.use(new LocalStrategy(authenticateUser))
passport.use(new BasicStrategy(authenticateUser))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  models.User.findOne({
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id'))
    }

    done(null, user)
  })
})


app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(routes)
app.use('/api', routes)

if(require.main === module) {
  app.listen(3000, function() {
    console.log("App is running on localhost:3000");
  });
}


module.exports = app;
