/**
 * API Template
 * Using Express and Massive to connect Postgres database and JWT for token scheme login
 * https://github.com/robconery/massive-js
 * https://jwt.io/
 * https://github.com/auth0/express-jwt
 *
 * @author Aderbal Nunes <aderbalnunes@gmail.com>
 * @license https://opensource.org/licenses/MIT
 * @link https://github.com/aderbas/node-api-base
 */
var express       = require('express'),
    expressJwt    = require('express-jwt'),
    jwt           = require('jsonwebtoken'),
    util          = require('util'),
    bodyParser    = require('body-parser'),
    extend        = require('util-extend'),
    http          = require('http'),
    show          = require('./show'),
    secret        = 'mySecr3t3';

var port = process.env.PORT || 3000; // check if nothing running on port 3000
var app = express();

/**
 * Uncomment here after editing the connection string
 * @see db/database.js
 */
//util.log('Scaning database...');
//app.set('db', require('./db/database.js').conn());

var unlessRouter = {path: ['/api/auth', '/api/version']};

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}).unless( unlessRouter ));
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
// handler error
app.use(function(err,req,res,next){
  res.status(401);
  res.json(show.error('Unauthorized', 401));
});
app.get('/api/version', function(req,res){
  res.json({version: '0.1.2'});
});

// autenticate
app.post('/api/auth', function(req,res){
  if(!req.body.email || !req.body.pwd){
    res.json(show.error('Params not valid'));
    return;
  }
  // fake login and fake user data
  if(req.body.email === 'aderbal@aderbalnunes.com' && req.body.pwd === '123456'){
    var u = {email: 'aderbal@aderbalnunes.com', name: 'Aderbas'};
    var token = jwt.sign(u, secret, { expiresIn: 60*200 });
    // return token
    res.json(show.result({token: token}));
  }else{
    res.json(show.error('Email or Password not match'));
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
