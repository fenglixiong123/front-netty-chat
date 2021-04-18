
//会在根目录下生成一个build文件夹,里面是bundle.libjs
//path.resolve()
//__dirname表示当前文件所在的目录的绝对路径
const pathUtil = require('path');

module.exports = {
    mode: "production", // "production" | "development" | "none"  // 告诉webpack是生产环境还是开发环境.
    entry: ['./module/module1.libjs'],//打包入口文件
    output: {                    //打包出口文件
        path: pathUtil.resolve(__dirname,'build'),//方法将路径或者路径片段的序列号处理成绝对路径
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
    // 自动打包运行
    // 指令：npx webpack-dev-server
    devServer: {
        port:8080,//修改端口为8080
        hot:true,//开启热加载
        open:true,//执行npm run以后会自动打开浏览器
        openPage:"/dist/login.html",//指定打开的页面
        compress:true,//是否开启压缩
        contentBase: resolve(__dirname,'build'),
    },
}
