/**
 * Created by 小红依 on 2017/10/16.
 */
var createHash = require('create-hash');
module.exports = function(mingma) {
    var password = createHash('md5').update(mingma).digest('base64');
    return password;
};
