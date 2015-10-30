var http = require('http');
var https = require('https');
var request = require('request');
var fs = require('fs');
var env = require('env2')('./config.env');
var index = fs.readFileSync(__dirname + '/../public/index.html');
var d3 = fs.readFileSync(__dirname + '/../public/d3.html');
var querystring = require('querystring');
var sessions = {};
var outer = {};
outer.user = {};
outer.following = [];
outer.followers = [];
outer.both = [];
outer.followingOnly = [];
outer.followersOnly = [];



authentication = function(req, res, match) {
  console.log(match);
  var urlArray = req.url.split('/');
  var code = urlArray[2].split('=')[1];
  getToken(code, function(data) {
    // TODO: check for conflict
    setToken(data, res, getUserData);
  });
};


function setToken(gitToken, res, callback) {

  var cookie = Math.floor(Math.random() * 100000000);
  var access_token = gitToken.split('=')[1].split('&')[0];
  sessions[cookie] = access_token;
  sessions.token = access_token;
  res.writeHead(200, {
    "Set-Cookie": 'access=' + cookie
  });
  callback();
  res.end(d3);
}

var getUserData = function() {

  var optionsuser = {
    hostname: 'api.github.com',
    path: '/user?access_token=' + sessions.token,
    method: 'GET'
  };
  var body = '';
  var userReq = https.request(optionsuser, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var username = JSON.parse(body);
      outer.user['name'] = username.login;
      outer.user['img'] = username.avatar_url;
      outer.user['group'] = 14;
      console.log(outer.user);
      followingData();
    });
  });
  userReq.setHeader('User-Agent', 'creepygit');
  userReq.end();

};


var getToken = function(code, callback) {
  console.log('gitHub code: \"' + code + "\"");
  var postData = querystring.stringify({
    client_id: process.env.clientID,
    client_secret: process.env.clientSecret,
    code: code
  });

  var options = {
    hostname: 'github.com',
    path: '/login/oauth/access_token',
    method: 'POST'
  };

  var req = https.request(options, function(res) {
    console.log('github return statusCode: ' + res.statusCode);
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      callback(body);
    });
  });
  req.end(postData);
};

function followingData() {
  var options = {
    hostname: 'api.github.com',
    path: '/user/following?access_token=' + sessions.token,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    console.log('github following returns status code' + res.statusCode);
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var followingBody = JSON.parse(body);
      outer.following = followingBody.map(function(object) {
        var newObj = {};
        newObj['name'] = object.login;
        newObj['img'] = object.avatar_url;
        return newObj;
      });
      followersData();

    });

  });
  req.setHeader('User-Agent', 'creepygit');
  req.end();
}


function followersData() {
  var options = {
    hostname: 'api.github.com',
    path: '/user/followers?access_token=' + sessions.token,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    console.log('github follower returns status code' + res.statusCode);
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var followersBody = JSON.parse(body);
      outer.followers = followersBody.map(function(object) {
        var newObj = {};
        newObj['name'] = object.login;
        newObj['img'] = object.avatar_url;
        return newObj;
      });
      // bothFollows();

      var both = function(callback) {
        outer.both = outer.followers.filter(function(elem) {
          return nameInArray(elem['name'], outer.following);
        });
        callback();
      };
      both(returnFollowersFollowing);
    });

  });
  req.setHeader('User-Agent', 'creepygit');
  req.end();
}

function nameInArray(name, array) {
  var found = false;
  array.forEach(function(aElem) {
    if (aElem['name'] === name) {
      found = true;
    }
  });
  return found;
}

function nameNotInArray(name, array) {
  var found = true;
  array.forEach(function(aElem) {
    if (aElem['name'] == name) {
      found = false;
    }
  });
  return found;
}

function returnFollowersFollowing() {

  outer.followersOnly = outer.followers.filter(function(elem) {
    return nameNotInArray(elem['name'], outer.both);

  });

  outer.followingOnly = outer.following.filter(function(elem) {

    return nameNotInArray(elem['name'], outer.both);

  });

  outer.both.forEach(function(element, index) {
    element.group = 5;
  });

  outer.followersOnly.forEach(function(element, index) {
    element.group = 1;
  });

  outer.followingOnly.forEach(function(element, index) {
    element.group = 7;
  });

  // console.log('-------outer.both--------', outer.both);
  // console.log('-------following only--------', outer.followingOnly);
  // console.log('-------followers only--------', outer.followersOnly);

  var concatArray = outer.both.concat(outer.followingOnly).concat(outer.followersOnly);
  concatArray.unshift(outer.user);

  var jsonObj = {
    nodes: concatArray,
    links: []
  };

  concatArray.forEach(function(obj, i) {
    if (i !== concatArray.length - 1) {
      jsonObj.links.push({
        'source': i + 1,
        'target': 0,
        'value': 1
      });
    }

  });


  console.log(jsonObj);
  fs.writeFile("./public/gitHubUsers.json", JSON.stringify(jsonObj),
    function(err) {
      if (err) {
        return console.log(err);
      }
    });





}

module.exports = authentication;
