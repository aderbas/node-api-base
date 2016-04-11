// User Controller
var Promise = require('bluebird'),
    util    = require('util');

module.exports = function(app){
  return {
    getUsers: function(){
      return new Promise(function(resolve, reject){
        app.get('db').table_user.find(function(err, users){
          if(err !== null){
            resolve({result: users});
          }else{
            reject({error: 'Not found users'});
          }
        });
      });
    }, // getUsers
    getUser: function(id){
      return new Promise(function(resolve, reject){
        app.get('db').table_user.find({id: id}, function(err, user){
          if(err !== null){
            resolve({result: user});
          }else{
            reject({error: 'User not found'});
          }
        });
      });
    }, // getUser
  };
};
