const find = require('./find');
var keyword = "Asiad";
var res = null;

find(keyword, (res) => { res = res; console.log(res) });
