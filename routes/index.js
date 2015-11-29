var express = require('express');
var router = express.Router();
var UserModel = require('../models/User.js');
var UserProxy = require('../proxy/user.js');
var ScenarioModel = require('../models/Scenario.js');
var _    = require('lodash');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: '随机场景系统', error: req.flash('error').toString()});
});

// normal user login the system
router.post('/',function (req,res,next) {

	var username = req.body.username;
    if(username.length!==4 || isNaN(username)){
        //这里用flash提示用户,用户名不能为空
        req.flash('error', "用户名格式有误，请重新填写！");
        console.log("The format of username is wrong, please retry!");
        return res.redirect('/');
    }

    UserModel.findOne({name:username}, function (err,user) {
		if (err) {
			req.flash('error', "系统错误：" + err);
            console.log(err);
			return res.redirect('/');
		}
        if(user){
            req.session.user = user.name;
            req.flash('success', "欢迎回来");
            console.log(req.session);
            return res.redirect('/scenario1');
        }
        UserProxy.newAndSave(username,function(err,user){
            if(err || !user){
                req.flash('error', "系统错误：" + err);
                console.log(err);
                return res.redirect('/');
            }
            req.session.user = user.name;
            req.flash('success', "欢迎使用");
            console.log(req.session);
            return res.redirect('/scenario1');
        });
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
	var username = req.session.user;
	if (username) {
	console.log(username);
	UserModel.findOne({'name':username}).exec(function (err, user) {
		if (err) {
			console.log(err);
			next(err);
		}
		console.log(user);
        var pos = user.s1;
		console.log(pos);
		ScenarioModel.find().exec(function (err, scenarios) {
        	if (err) {
            	next(err);
        	}
        	var scen = [];
        	for (var i=0; i<scenarios.length; i++) {
        		for (var j=0; j<scenarios.length; j++) {
        			if (i == scenarios[j].id) {
        				scen[i] = {'timu':scenarios[j].name, 'xuanze':scenarios[j].scenario[pos[i]]};
        				break;
        			}
        		}
        	}
        	res.render('scenario1', { title: '随机场景1', scen: scen });
    	});
	});	
} else {
	req.flash('error', "登录超时");
	res.redirect('/');
}
});

// Random Scenario 2
//router.get('/scenario2', checkNotLogin);
router.get('/scenario2',function (req,res,next) {
	var username = req.session.user;
	if (username) {
		console.log(username);
	UserModel.findOne({'name':username}).exec(function (err, user) {
		if (err) {
			console.log(err);
			next(err);
		}
		console.log(user);
        var pos = user.s2;
		console.log(pos);
		ScenarioModel.find().exec(function (err, scenarios) {
        	if (err) {
            	next(err);
        	}
        	var scen = [];
        	for (var i=0; i<scenarios.length; i++) {
        		for (var j=0; j<scenarios.length; j++) {
        			if (i == scenarios[j].id) {
        				scen[i] = {'timu':scenarios[j].name, 'xuanze':scenarios[j].scenario[pos[i]]};
        				break;
        			}
        		}
        	}
        	res.render('scenario2', { title: '随机场景2', scen: scen });
    	});
	});	
} else {
	req.flash('error', "登录超时");
	res.redirect('/');
}
});

// Random Scenario 3
//router.get('/scenario3', checkNotLogin);
router.get('/scenario3',function (req,res,next) {
	var username = req.session.user;
	if (username) {
	console.log(username);
	UserModel.findOne({'name':username}).exec(function (err, user) {
		if (err) {
			console.log(err);
			next(err);
		}
		console.log(user);
        var pos = user.s3;
		console.log(pos);
		ScenarioModel.find().exec(function (err, scenarios) {
        	if (err) {
            	next(err);
        	}
        	var scen = [];
        	for (var i=0; i<scenarios.length; i++) {
        		for (var j=0; j<scenarios.length; j++) {
        			if (i == scenarios[j].id) {
        				scen[i] = {'timu':scenarios[j].name, 'xuanze':scenarios[j].scenario[pos[i]]};
        				break;
        			}
        		}
        	}
        	res.render('scenario3', { title: '随机场景3', scen: scen });
    	});
	});	
} else {
	req.flash('error', "登录超时");
	res.redirect('/');
}
});


// User List with their random sequence
router.get('/userlist',function (req, res, next) {
	res.render('userlist', { title: '当前系统用户列表' });
});


module.exports = router;
