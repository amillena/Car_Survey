// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../models/user.js");
var passport = require("../config/passport.js");

// Routes
// =============================================================
module.exports = function(app,passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // Get all cars
  app.get("/api/all", function(req, res) {

    User.findAll({}).then(function(results) {
      res.json(results);
    });

  });

  // Get a specific car
  app.get("/api/:model", function(req, res) {

    if (req.params.model) {
      User.findAll({
        where: {
          model: req.params.model
        }
      }).then(function(results) {
        res.json(results);
      });
    }

  });

  // Get all cars of a specific make
  app.get("/api/make/:make", function(req, res) {

    if (req.params.make) {
      User.findAll({
        where: {
          make: req.params.make
        }
      }).then(function(results) {
        res.json(results);
      });
    }

  });

  // Get all cars from a specific user
  app.get("/api/user/:username", function(req, res) {

    if (req.params.username) {
      User.findAll({
        where: {
          username: req.params.username
        }
      }).then(function(results) {
        res.json(results);
      });
    }

  });

  

  // Add a User
  app.post("/api/new", function(req, res) {

    console.log("User Data:");
    console.log(req.body);
    User.create({
      username: req.body.username,
      model: req.body.model,
      make: req.body.make,
      color: req.body.color,
      price: req.body.price,
      swap: req.body.swap,
      url: req.body.url
    });

  });

  // Delete a user
  app.post("/api/delete", function(req, res) {

    console.log("User Data:");
    console.log(req.body);
    User.destroy({
      where: {
        id: req.body.id
      }
    });

  });

};
// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}