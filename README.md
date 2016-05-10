API Node using JWT

* How to use
```
$ cd node-api-base/
$ npm install
$ node app.js
```
* Router

All routes are found in the "routes" folder by following the user template.

Using [MassiveJS](https://github.com/robconery/massive-js) relational data access (See <code>db/database.js</code> to configure connection string) and [express-jwt](https://github.com/auth0/express-jwt) to validate JWT. The token provides the user information and the date of validity.

To decode token in your client app see: [Json Web Token](https://jwt.io/)
