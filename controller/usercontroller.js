// User Controller
var util    = require('util');

/**
 * This is an example of a user controller
 * This module is responsible for all operations related to user table.
 */
module.exports = function(app){
  return {
    getUsers: function(){
      return Promise.resolve({ then: (resolve, reject) => {
          app.get('db').table_user.find().then((users) => {
            if(users){
              resolve(users);
            }else{
              reject({err: 'Users not found'});   
            }
          });
        }
      });
    }, // getUsers
    get: function(id){
      return Promise.resolve({ then: (resolve, reject) => {
          app.get('db').table_users.findOne({id: id}).then((User) => {
            if(User){
              resolve(User);
            }else{
              reject({err: 'User not found'});   
            }
          });
        }
      });
    }, // getUser
  };
};
