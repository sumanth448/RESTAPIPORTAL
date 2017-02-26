//var report = require('./models/report');
"use strict";
var ncp = require('ncp').ncp;
var futures = require('futures');
var sequence = futures.sequence();
var fs = require('fs');
var gm = require('gm');
var path = require('path');
var request = require('request');

module.exports = function(app) {

    app.get('/', function(req, res) {
        console.log("in get");
        console.log(__dirname);
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    //
    app.post('/api/push', function(req, res) {
        console.log("erehjehj");
        console.log(req.body.type);
        console.log(req.body.headers);
        console.log(req.body.params);
        console.log(req.body.body);
        let header={};
        for(var i=0;i<req.body.headers.length;i++)
            {
                var temp = req.body.headers[i].key;
                header[temp]=req.body.headers[i].value;
            }
        console.log(JSON.stringify(header));
        let requests={};
        requests.url=req.body.url;
        requests.method=req.body.type;
        if(req.body.headers.length !== 0){requests.headers=header;}
        if(req.body.type !== "GET"){requests.body=req.body.body;}
        console.log(requests);
        request(requests, function(error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                    res.send(response);
                }
            });
        
    });
}