const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    //entry:'./src/index.js
    //entry:['./src/index.js','./src/index2.js'],//入口
    entry:{
        //先找到每个入口(entry)，然后从各个入口分别出发，找到依赖的模块(Module),然后生成一个chunk(代码块,每个入口是一个代码块)，最后会把chunk写到文件系统中（assets）
        index:'./src/index.js',
        index2:'./src/index2.js',
        common:'./src/common.js'
        //这是一个入口，引用jquery库
        //vendor:'jquery'

    },
    output: {//输出
        path:path.join(__dirname,'dist'),//输出的文件夹，只能是绝对路径
        //[name]:就是entry的名字，默认名字，hash根据打包后的文件内容计算出来的一个hash值32位，如果只要八位【hash:8]
        filename:'[name].[hash:8].js',//打包后的文件名,
    },
    module:{//模块
        /*
        * loader有三种写法
        * use
        * loader
        * use+loader
        * */
        rules:[
            /*{//将jquery设置为全局变量方式2，没成功
                test:require.resolve('jquery'),
                use:{
                    loader:'expose-loader',
                    options:'$'
                }
            },*/
            {
                test:/\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
                loader:"url-loader"
            },
            {
                test:/\.css$/,//转换文件的匹配正则
                //css-loader用来解析处理css文件中的url路径
                //style-loader可以把css文件编程style标签插入head中
                //loader是有顺序要求的，从右往左写
                loader:['style-loader','css-loader']
            }

        ]
    },
    plugins:[//插件
        //自动向模块内部注入变量
        new webpack.ProvidePlugin({//会向模块中提供这个变量
            $:'jquery',//变量名为$;模块是jquery
        }),

        //此插件可以自动传出html文件
        new HtmlWebpackPlugin({
            title:'webpack-html-plugin生成的标题',//模板的标题，调用方式<%=htmlWebpackPlugin.options.title%>
            template:'./src/index.html',//以index.html为模板，生成html文件
            filename:'index.html',//产出文件名
            chunks:['common','index'],//在产出的html文件里引入那些代码块
            hash:true,//会在引入的js里加入查询字符串避免缓存
            minify:{
                removeAttributQuotes:true
            }
        }),
        new HtmlWebpackPlugin({
            title:'webpack-html-plugin生成的标题',//模板的标题，调用方式<%=htmlWebpackPlugin.options.title%>
            template:'./src/index.html',//以index.html为模板，生成html文件
            filename:'index2.html',//产出文件名
            chunks:['common','index2'],//在产出的html文件里引入那些代码块
            hash:true,//会在引入的js里加入查询字符串避免缓存
            minify:{
                removeAttributQuotes:true
            }
        }),


        //在编译之前清除dist文件夹
        new CleanWebpackPlugin(),
    ],
    //配置此静态文件服务器，可以预览打包后的项目
    devServer:{
        contentBase:"./dist",
        host:"localhost",
        port:8089,
        compress:true,//服务器返回给浏览器的时候是否启用gzip压缩

    }

}
