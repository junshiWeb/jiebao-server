const crypto = require('crypto');

var soft = '@##$#$Sdsadwaeaweasdasds'
function jiami(str) {
  var obj = crypto.createHash('md5');
  obj.update(str + soft);
  return obj.digest('hex');
}

module.exports = jiami