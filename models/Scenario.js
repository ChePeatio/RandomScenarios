var mongoose = require('mongoose');

var ScenarioSchema = new mongoose.Schema({
	id: Number,
    name: String,
    scenario: [String]
});

var ScenarioModel = mongoose.model('Scenario', ScenarioSchema);

module.exports = ScenarioModel;