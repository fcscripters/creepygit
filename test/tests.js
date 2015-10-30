var tape = require('tape');
var shot = require('shot');
var assert = require('assert');
var generalHandler = require('../handlers/generalHandler');
var testrequest = require('request');
var router = require('routes')();


tape("check to see if the server is running ok", function (t) {
  shot.inject(generalHandler, {method: 'get', url: '/'},function (res){
    var result = res.statusCode;
    t.equal(result, 200, "success!");
    t.end();
  });
});
