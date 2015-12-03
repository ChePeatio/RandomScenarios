var mongoose = require('mongoose');
var eventproxy = require('eventproxy');
var config = require('../config.js');
var ScenarioModel = require('../models/Scenario.js');

mongoose.connect(config.db,function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful : ' + config.db);
    }
});

var ScenarioList = [
    {
        "id": 0,
        "name": "不遵从给公司带来的收益",
        "scenario": ["可以给公司节约少量的钱","可以给公司节约一大笔钱","会提高公司的收入",
            "会给公司赢得好声誉","会提高雇员的斗志","可以质疑某个法律并得到支持"]
    },
    {
        "id": 1,
        "name": "不遵从给你带来的好处",
        "scenario": ["使你升职或加薪的可能性提高","使你被同事认可的可能性提高","使你得到领导的重视"]
    },
    {
        "id": 2,
        "name": "公司内部遵从机制",
        "scenario": ["公司有强制性的遵从培训（如:岗前税收支持培训）",
            "公司有向管理层匿名举报的热线", "公司会不定期的进行内部审计或检查",
            "一个从事过相似违规行为的员工最近被发现并被开除了",
            "这种违法行为在公司很普遍", "这种违法行为在行业很普遍"]
    },
    {
        "id": 3,
        "name": "公司外部遵从环境",
        "scenario": ["其他公司从事过相似违法行为的职员最近因此被捕并被判处3年有期徒刑",
            "其他公司从事过相似违法行为的职员最近被税务机关处以补税并罚款",
            "一个有相似违法行为的公司最近被认定有罪并判处罚金，法定代表人被判处有期徒刑",
            "一个有相似违法行为的公司最近被税务机关实施税务检查",
            "一个有相似违法行为的公司最近被税务机关补税并处以罚款",
            "一个从事过相似违法行为的职员最近被无罪释放了",
            "一个有相似违法行为的公司最近被判无罪"]
    },
    {
        "id": 4,
        "name": "你的职位",
        "scenario": ["底层管理者（如:销售经理、财务经理）","中层管理者（如:财务总监）","高层管理者（如:总经理、董事长）"]
    },
    {
        "id": 5,
        "name": "你在公司的地位",
        "scenario": ["你是发出命令指示他人实施上述违法行为的人（order)","你是被上级领导要求实施上述违法行为的人(ordered)"]
    },
    {
        "id": 6,
        "name": "任期",
        "scenario": ["你在公司工作不足2年","你已在公司工作2年以上"]
    },
    {
        "id": 7,
        "name": "公司规模（以雇员数量为衡量标准）",
        "scenario": ["小微企业（300人以下）","中型企业（300-1000人）","大企业（1000人以上）"]
    },
    {
        "id": 8,
        "name": "经济压力",
        "scenario": ["所处公司的销售量和销售收入在稳步增长","所处公司的销售量和销售收入都在下滑"]
    },
    {
        "id": 9,
        "name": "所处行业现状",
        "scenario": ["行业正在健康发展","行业在衰退","行业市场份额受到国外竞争者的蚕食"]
    }
];

ScenarioModel.remove(function (err) {
    if (err) {
        console.log(err);
    } else {
        var ep = new eventproxy();
        for (var i = 0, length = ScenarioList.length; i < length; i++) {
            ScenarioModel.create(ScenarioList[i], function (err, scenario ){
                if (err) {
                    console.log(err);
                } else {
                    ep.emit('createScenario', scenario);
                }
            });
        }
        ep.after('createScenario', ScenarioList.length, function (scenarios) {
            console.log(scenarios);
            mongoose.connection.close();
        });
    }
});