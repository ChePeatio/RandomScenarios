var UserModel = require('../models/User.js');
var ScenarioModel = require('../models/Scenario.js');

module.exports.generateScenario = function (username, seq, callback) {
	var err = new Error("username is undefined");
	if (!username) {
		callback(err, null);
	}
	UserModel.findOne({'name':username}).exec(function (err, user) {
		if (err) {
			console.log(err);
			next(err);
		}

		var pos = [];
		if (seq == 1) {
			pos = user.s1;
		} else if (seq == 2) {
			pos = user.s2;
		} else {
			pos = user.s3;
		}

		ScenarioModel.find().sort({'id': 1}).exec(function (err, scenarios) {
			if (err) {
				next(err);
			}
			var scen = [];
			for (var i=0; i<scenarios.length; i++) {
				scen[i] = {'timu':scenarios[i].name, 'xuanze':scenarios[i].scenario[pos[i]]};
			}
			callback(null, scen);
		});
	});
};