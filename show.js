// Make return result
module.exports = {
  result: function(data){
    return {
      result: data,
      msg: 'Data result',
      error: 0
    };
  },
  error: function(_msg, _cod){
    return {
      result: null,
      msg: _msg,
      error: _cod||404
    };
  }
};
