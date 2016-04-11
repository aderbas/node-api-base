// API BASE
// Using Express and Massive to connect postgres database
// https://github.com/robconery/massive-js
var express       = require('express'),
    expressJwt    = require('express-jwt'),
    jwt           = require('jsonwebtoken'),
    util          = require('util'),
    bodyParser    = require('body-parser'),
    extend        = require('util-extend'),
    http          = require('http'),
    secret        = 'mySecr3t3';

var port = process.env.PORT || 3000; // check if nothing run on port
var app = express();
//util.log('Scaning database...');
// set database
// app.set('db', require('./db/database.js').conn());

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Timezone");
  next();
});

// autenticate
app.post('/auth', function(req,res){
  if(!req.body.email || !req.body.pwd){
    res.json({fault: 'Params not valid'});
    return;
  }
  // fake login and fake user data
  if(req.body.email === 'aderbal@aderbalnunes.com' && req.body.pwd === '123456'){
    var u = {email: 'aderbal@aderbalnunes.com', name: 'Aderbas'};
    var token = jwt.sign(u, secret, { expiresIn: 60*200 });

    res.json(extend(u, {token: token}));
  }else{
    res.json({fault: 'Email or Password not match'});
    return;
  }

});

// ################## ROUTES
app.use('/api/user', require('./routes/user')(express,app));
// ########################

// ################## SERVER
var server = http.createServer(app).listen(port);
// if using https protocol: var server = https.createServer(require('./certificate.js'), app).listen(4430);
// see certificate.js
util.log('Listen on port '+port);
// ############## END SERVER
