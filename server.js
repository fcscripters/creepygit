var http = require('http');
var url = require('url');
var router = require('routes')();
var generalHandler = require('./handlers/generalHandler');
var fs =require('fs');
var port = process.env.PORT || 8000;

router.addRoute('/', require('./handlers/home.js'));
router.addRoute('/auth', require('./handlers/authentication.js'));





function handler(req, res) {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);

  if(match){
    match.fn(req, res, match);
  }else{
    generalHandler(req,res);
  }
}

http.createServer(handler).listen(port);
console.log('you are listening on: ', port );
