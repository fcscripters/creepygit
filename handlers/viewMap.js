var fs =require('fs');
var d3 = fs.readFileSync(__dirname + '/../public/d3.html');
var d3JSON = fs.readFileSync(__dirname + '/../public/gitHubUsers.json','utf-8');




module.exports = function home(req, res){
  res.writeHead(200, {'Content-Type':'text/html'});
  console.log(d3JSON);
  res.end(d3JSON);
  // res.end(d3);
};
