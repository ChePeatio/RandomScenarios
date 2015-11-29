var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: '随机场景系统' });
});

// normal user login the system
router.post('/',function (req,res,next) {

	var nuser = new User({
		name : req.body.username
	});

	User.get(nuser.name, function (err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		return res.redirect('/scenario1');
	});
});


// System Manager Login
//router.get('/login', checkNotLogin);
router.get('/login',function (req,res,next) {
	res.render('login', { title: '系统管理员登录' });
});

// system manager login the system
router.post('/login',function (req,res,next) {
	res.redirect('/userlist');
});


// Random Scenario 1
//router.get('/scenario1', checkNotLogin);
router.get('/scenario1',function (req,res,next) {
	res.render('scenario1', { title: '随机场景1' });
});

// Random Scenario 2
//router.get('/scenario2', checkNotLogin);
router.get('/scenario2',function (req,res,next) {
	res.render('scenario2', { title: '随机场景2' });
});

// Random Scenario 3
//router.get('/scenario3', checkNotLogin);
router.get('/scenario3',function (req,res,next) {
	res.render('scenario3', { title: '随机场景3' });
});


// User List with their random sequence
router.get('/userlist',function (req, res, next) {
	res.render('userlist', { title: '当前系统用户列表' });
});


module.exports = router;
