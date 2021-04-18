
//会在根目录下生成一个build文件夹,里面是bundle.js
//path.resolve()
//__dirname表示当前文件所在的目录的绝对路径
const path = require('path');
//打包工具
const Webpack = require('webpack');
//文件复制插件
const CopyWebPackPlugin = require('copy-webpack-plugin');
//打包html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourceHtml = './src/html/';
const distHtml = './view/';

module.exports = {
    mode: "development", // "production" | "development" | "none"  // 告诉webpack是生产环境还是开发环境.
    entry: {
        login:'./src/js/login.js',//第一个html的入口文件
        register:'./src/js/register.js'//第二个html的入口文件
    },//打包入口文件
    output: {                      //打包出口文件
        publicPath:'/web-chat/',//打包生成的html文件里面引用资源的前缀
        path: path.resolve(__dirname,'dist'),//输出的文件夹
        filename: 'js/[name].bundle.js'//输出文件名，后面接上16位hash
    },
    module: {//处理项目中不同类型的模块
        rules: [{//用于规定在不同模块被创建时如何处理模块的规则数组
            test: /\.js$/, //匹配特定文件的正则表达式或正则表达式数组，处理以.js结尾的文件
            //include: ["./webapp/style/js/login.js"],//规则适用的范围,如：path.resolve(__dirname, "app")
            exclude: /node_modules/, //规则排除的范围，处理除了node_modules里的js文件
            loader: 'babel-loader', //用babel-loader处理,webpack使用loader的方式处理各种各样的资源
        }]
    },
    plugins: [//html打包插件
        new Webpack.HotModuleReplacementPlugin(),//热启动插件
        new CopyWebPackPlugin({
            patterns: [//可以添加排除文件的选项:globOptions:{ignore:['.*'], copyUnmodified: true}
                {
                    from: path.resolve(__dirname,"src/static"),
                    to: path.resolve(__dirname,"dist/static")
                }
            ]
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],//对应上面打包出来的login.js
            template: sourceHtml+'login.html',//用于定义模版文件的路径
            filename: distHtml+'login.html',//输出的HTML文件名，默认为index.html
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false,
                minifyJS: false,
                minifyCSS: false
            },
            chunksSortMode: 'auto'
        }),
        new HtmlWebpackPlugin({
            chunks: ['register'],//对应上面打包出来的login.js
            template: sourceHtml+'register.html',//用于定义模版文件的路径
            filename: distHtml+'register.html',//输出的HTML文件名，默认为index.html
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false,
                minifyJS: false,
                minifyCSS: false
            },
            chunksSortMode: 'auto'
        })
    ],
    // 自动打包运行
    // 指令：npx webpack-dev-server
    devServer: {
        port:8080,//修改端口为8080
        hot:true,//开启热加载
        open:true,//执行npm run以后会自动打开浏览器
        progress: true,//显示启动进度条
        openPage:"web-chat/view/login.html",//指定打开的页面
        publicPath:'/web-chat/'//对生成目录dist设置的虚拟目录,首先从devServer.publicPath中取值,没有就取output.publicPath的值，否则取默认值"/",也影响利用html-webpack-plugin插件生成的index.html中引用的js、css、img等资源的引用路径。
    },
    resolve: {//解析后缀，可以require的时候不需要添加后缀
        extensions: ['.js', '.vue', '.json']
    },
}
