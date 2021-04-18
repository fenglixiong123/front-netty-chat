
//会在根目录下生成一个build文件夹,里面是bundle.libjs
//path.resolve()
//__dirname表示当前文件所在的目录的绝对路径
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development", // "production" | "development" | "none"  // 告诉webpack是生产环境还是开发环境.
    entry: ['./webapp/style/libjs/login.libjs'],//打包入口文件
    output: {                      //打包出口文件
        publicPath:'/web-chat/',//给生成的静态资源路径添加前缀的
        path: path.resolve(__dirname,'dist'),//方法将路径或者路径片段的序列号处理成绝对路径
        filename: 'bundle.libjs'//打包后的文件名称
    },
    module: {//处理项目中不同类型的模块
        //webpack使用loader的方式处理各种各样的资源
        rules: [{//用于规定在不同模块被创建时如何处理模块的规则数组
            test: /\.js$/, //匹配特定文件的正则表达式或正则表达式数组，处理以.js结尾的文件
            exclude: /node_modules/, //规则排除的范围，处理除了node_modules里的js文件
            include: ["./webapp/style/libjs/login.libjs"],//规则适用的范围,如：path.resolve(__dirname, "app")
            loader: 'babel-loader', //用babel-loader处理
            options: {
                presets: ["es2015"]//将es6转为es5
            },
        }]
    },
    plugins: [//html打包插件
        new HtmlWebpackPlugin({
            title: 'hello world',
            template: './webapp/html/login.html',//用于定义模版文件的路径
            filename: 'login.html'//输出的HTML文件名，默认为index.html
        })
    ],
    // 自动打包运行
    // 指令：npx webpack-dev-server
    devServer: {
        port:8080,//修改端口为8080
        hot:true,//开启热加载
        open:true,//执行npm run以后会自动打开浏览器
        progress: true,//显示启动进度条
        //openPage:"/dist/login.html",//指定打开的页面
        contentBase: path.resolve(__dirname,'/dist'),//表示的是告诉服务器从哪里提供内容。（也就是服务器启动的根目录，默认为当前执行目录，一般不需要设置）
        publicPath:'/web-chat/'//对生成目录dist设置的虚拟目录,首先从devServer.publicPath中取值,没有就取output.publicPath的值，否则取默认值"/",也影响利用html-webpack-plugin插件生成的index.html中引用的js、css、img等资源的引用路径。
    },
}
