var mongoose = require('mongoose');

var ScenarioSchema = new mongoose.Schema({
	id: Number,
    name: String,
    scenario: [String]
});

var ScenarioModel = mongoose.model('Scenario', ScenarioSchema);

ScenarioModel.generate = function generate(callback) {
	ScenarioModel.find({"id": 0}, function (err, result){
		if (err) {
			return callback(err);
		}
    	if(result.length !== 0) {
    		console.log("scenarios exist!");
    		return callback(err);
    	} else {
    	    // 生成随机数，并存入数据库
    	    var scen = new ScenarioModel();
    		scen.id = 0;
    		scen.name = "不遵从给公司带来的收益";
    		scen.scenario = ["可以给公司节约少量的钱","可以给公司节约一大笔钱","会提高公司的收入",
					"会给公司赢得好声誉","会提高雇员的斗志","可以质疑某个法律并得到支持"];
    		scen.save(function(err,scen){
        		if(err){
            		next(err);
        		}
        		console.log(scen);
    		});
    		console.log("successful add scen");
    		callback(err);
    	}
	});	
};

module.exports = ScenarioModel;