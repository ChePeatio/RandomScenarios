var UserModel = require('../models/User.js');
var ScenarioModel = require('../models/Scenario.js');
var eventproxy = require('eventproxy');
var _ = require('lodash');


//var generateRandom = function() {
//
//    // 获取Scenario表中的数据，用来生成随机数
////	var numOfScenario = ScenarioModel.count();
//    ScenarioModel.find(function (err, result){
//        if (err) {
//            console.log("Scenario error: " + err);
//        }
//        if(result.length !== 0) {
//            console.log("Scenario count: " + result.length);
//        }
//    });
//
//    var numOfScenario = 10;
//    var randomArray = new Array(numOfScenario);
//    for (var i=0; i<numOfScenario; i++) {
//        //var seperator = ScenarioModel.find({'id':i}, function(err){});
//        var seperator = 2;
//        randomArray[i] = Math.floor(Math.random() * seperator + 1);
//    }
//    return randomArray;
//}

var generateRandom = function (callback) {
    var random = [];
    ScenarioModel.find().exec(function (err, scenarios) {
        if (err) {
            callback(err, null);
        }
        random = scenarios.map(function (scenario) {
            var length = scenario.scenario.length;
            return _.random(length);
        });
        callback(null,random);
    });
}


module.exports.newAndSave = function (name, callback) {
    var user = new UserModel();
    var ep = eventproxy();
    ep.fail(callback);

    ep.all(s1, s2, s3, function (s1, s2, s3) {
        user.name = name;
        user.s1 = s1;
        user.s2 = s2;
        user.s3 = s3;
        user.save(callback);
    });

    generateRandom(ep.done('s1'));
    generateRandom(ep.done('s2'));
    generateRandom(ep.done('s3'));
};

