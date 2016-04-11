// User routes
module.exports = function(express,app){
  // router
  var router = express.Router();
  // controller
  // var userctrl = require('../controller/usercontroller.js')(app);
  // create routes
  router.get('/', function(req,res){
    //
    res.json([
      {id: 123, name: 'Bal', email: 'aderbal@domain.com'},
      {id: 321, name: 'Tiago', email: 'tiago@domain.com'},
    ]);
  });

  router.get('/:id', function(req,res){
    var id = req.body.id;
    // fake data
    res.json({
      id: 321,
      name: 'Tiago',
      email: 'tiago@domain.com'
    });
  });

  return router;
}
