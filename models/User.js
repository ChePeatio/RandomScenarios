var mongoose = require('mongoose');
var ScenarioModel = require('./Scenario');

var UserSchema = new mongoose.Schema({
    name: String,
    s1: [Number],
    s2: [Number],
    s3: [Number]
});

var UserModel = mongoose.model('User', UserSchema);

function User(user) {
	this.name = user.name;
}

User.get = function get(username, callback) {
	UserModel.find({"name": username }, function (err, result){
		if (err) {
			return callback(err);
		}
    	if(result.length !== 0) {
    		console.log("user exist" + result);
    		return callback(err);
    	} else {
    	    // 生成随机数，并存入数据库
    	    var user = new UserModel();
    		user.name = username;
    		user.s1 = generateRandom();
    		user.s2 = generateRandom();
    		user.s3 = generateRandom();
    		user.save(function(err,user){
        		if(err){
            		next(err);
        		}
        		console.log(user);
    		});
    		console.log("successful add user");
    		callback(err);
    	}
	});	
};

function generateRandom() {

	// 获取Scenario表中的数据，用来生成随机数
//	var numOfScenario = ScenarioModel.count();
	var numOfScenario = 10;
	var randomArray = new Array(numOfScenario);
	for (var i=0; i<numOfScenario; i++) {
		//var seperator = ScenarioModel.find({'id':i}, function(err){});
		var seperator = 2;
		randomArray[i] = Math.floor(Math.random() * seperator + 1);
	}
	return randomArray;
}

module.exports = User;