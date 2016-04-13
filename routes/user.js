// User router
var show = require('../show');

// User routes
module.exports = function(express,app){
  // router
  var router = express.Router();
  // use Controller
  /**
   * To use the query in the database on router
   * var userctrl = require('../controller/usercontroller.js')(app);
   * userctrl.getUser(123).then( function(user){ }, function(err){ } );
   */

  // create routes
  router.get('/', function(req,res){
    // fake data
    res.json(show.result([
      {id: 123, name: 'Bal', email: 'aderbal@domain.com'},
      {id: 321, name: 'Tiago', email: 'tiago@domain.com'},
    ]));
  });

  router.get('/:id', function(req,res){
    var id = req.body.id;
    // fake data
    res.json(show.result({
      id: 321,
      name: 'Tiago',
      email: 'tiago@domain.com'
    }));
  });

  return router;
}
