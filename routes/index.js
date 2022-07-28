// require('dotenv').config();
const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
const passport = require('passport');
var User = require('../models/user');

router.get('/', function (req, res) {
	res.render('landing');
});

// AUTH ROUTES
router.get('/register', function (req, res) {
	res.render('register');
});

// Sign up logic handled here
router.post('/register', function (req, res) {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let username = req.body.username;

	var newUser = new User({
		firstname: firstname,
		lastname: lastname,
		username: username
	}); 

	console.log(username)
	User.register(newUser, req.body.password, function (err, user) {
		console.log(newUser)
		if(err){
			console.log('error registering user');
			console.log(err);
			return res.redirect('/register');
		}
		User.authenticate('local')(req, res, function () {
			res.redirect('/campgrounds');
		});
	});
});
// Login form and logic
router.get('/login', function (req, res) {
	res.render('login', { currentUser: req.user });
});

router.post('/login', passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
	}),

	function (req, res) {}
);

// Logout
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/campgrounds');
});

// Middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
