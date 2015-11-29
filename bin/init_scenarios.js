var mongoose = require('mongoose');
var eventproxy = require('eventproxy');

mongoose.connect('mongodb://localhost/fcws_expr');

var Org = require('../models/Org.js');

var orgList = [
    {id: 'org01', name: '1营', leader: '001', orgs:[]},
    {id: 'org02', name: '1连', leader: '002', orgs:[]},
    {id: 'org03', name: '1排', leader: '003', orgs:[]}
];

Org.remove(function (err) {
    if (err) {
        console.log(err);
    } else {
        var ep = new eventproxy();
        for (var i = 0, length = orgList.length; i < length; i++) {
            Org.create(orgList[i], function (err, org) {
                if (err) {
                    console.log(err);
                } else {
                    ep.emit('createOrg', org);
                }
            });
        }
        ep.after('createOrg', orgList.length, function (orgs) {
            console.log(orgs);
            mongoose.connection.close();
        });
    }
});