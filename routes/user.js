// User router
var show = require('../show');

// User routes
module.exports = function(express,app){
  // router
  let router = express.Router();
  // use Controller
  /**
   * To use the query in the database on router
   */
  let userctrl = require('../controller/usercontroller.js')(app);

  // create routes
  router.get('/', (req,res) => {
    userctrl.getAll().then((result) => { res.json(result); }, (err) => { res.json(err); });
  });

  router.get('/:id', function(req,res){
    userctrl.get(req.params.id).then((result) => { res.json(result); }, (err) => { res.json(err); });
  });

  return router;
}
