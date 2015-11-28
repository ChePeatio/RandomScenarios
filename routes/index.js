var express = require('express');
var router = express.Router();
var UserModel = require('../models/User.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: '随机场景系统' });
});

// normal user login the system
router.post('/',function (req,res,next) {
    var user = new UserModel();
    user.name = '1234';
    user.s1 = [1,2,3,4,4,3,2,1,1,2];
    user.s2 = [1,1,1,1,1,1,1,1,1,1];
    user.s3 = [2,2,2,2,2,2,2,2,2,2];
    user.save(function(err,user){
        if(err){
            next(err);
        }
        console.log(user);
    });

	res.redirect('/scenario1');
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
