//加全局变量$,指向jquery   expose-loader?全局变量名!   模块名 它会先假装此模块，然后得到模块的导出对象，并且挂到window上; 插件安装 npm install expose-loader -D
//let $ = require('expose-loader?$!jquery');
console.log($);
console.log('hello');
$('#app').html('peter111111')
//在js里，在入口文件里加载css代码
//因为css并不是js模块，所以需要转换，这些转换的工具就是loader
require('./index.css')
