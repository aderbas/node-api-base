var fs = require('fs'),
    tls = require('tls');

// Use SNICallback
module.exports = {
  SNICallback: function(servername, cb) {
    var certificates = {
      "domain.com": ["/etc/apache2/ssl/domain_com.key", "/etc/apache2/ssl/domain_com.crt", "/etc/apache2/ssl/geotrust_ssl_intermediate_ca.crt"],
    };
    if(certificates[servername]){
      var ctx = tls.createSecureContext({
        key: fs.readFileSync(certificates[servername][0]),
        cert: fs.readFileSync(certificates[servername][1]),
        ca: [fs.readFileSync(certificates[servername][2])]
      });
      if(cb){
        cb(null, ctx);
      }else{
        return ctx;
      }
    }
  },
  // defauls
  key: fs.readFileSync('/etc/apache2/ssl/apache.key', 'utf8'),
  cert: fs.readFileSync('/etc/apache2/ssl/apache.crt', 'utf8')
};
