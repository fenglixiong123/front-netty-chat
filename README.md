
# Web-Netty-Chat

技术栈：html+es6+css+layui  
打包：webpack+babel

要运行es6需要使用webpack+babel来进行转换

参考文章：    

* https://segmentfault.com/a/1190000022847012
* https://www.cnblogs.com/makalochen/p/13792400.html
* https://blog.csdn.net/weixin_33775582/article/details/86008308

## Windows测试可用

现在的浏览器很多都不支持es6的语法，或者仅仅是部分支持  
babel就承担了“翻译”的角色，把es6的写法转换成es5的写法。  
利用webpack打包工具进行打包

前面先安装最新版node

### 1.创建项目

    新建项目：netty-web-chat
    进入项目：cd netty-web-chat  

### 2.初始化项目

    npm init
    
 会生成 package.json文件

#### 3.安装各种依赖

 打开终端程序执行下面命令(按需选择)：
 
* 安装cross-env 能跨平台地设置及使用环境变量

        npm install cross-env --save-dev

* 安装webpack 打包工具 

        npm install webpack --save-dev //默认为最新版本5.0
        npm install webpack-cli --save-dev
        
* 安装webpack-copy 复制文件插件

        npm install copy-webpack-plugin --save-dev//用来复制静态文件         
        
* 安装dev-server 热部署服务

        npm install webpack-dev-server --save-dev

* 安装babel  实现 ES6 到 ES5

        核心三个：
        
        npm install babel-loader --save-dev //安装loader
        npm install @babel/core@7.4.5 --save-dev //安装babel核心
        npm install @babel/preset-env@7.4.5 --save-dev //安装转码器
        
        按需要添加：
        
        npm install @babel/plugin-proposal-class-properties --save-dev //如果使用了es6的class需要安装
        npm install @babel/polyfill --save-dev//解决es6的一些新特征，比如promise
        
* 安装html 实现html打包

        npm install html-webpack-plugin --save-dev

* 优化压缩 实现快速访问

        npm install uglify-es --save-dev    //压缩js
        npm install clean-css --save-dev    //压缩css

一键安装：

       npm install -D cross-env webpack webpack-cli webpack-dev-server babel-loader @babel/core@7.4.5 @babel/preset-env@7.4.5 @babel/plugin-proposal-class-properties html-webpack-plugin 
       
   注意：      
        
       如果webpack版本过高，则需要更换为低版本：
            npm uninstall webpack-cli
            npm install webpack-cli@3 --save-dev
            
       如果安装了babel-preset-es2015需要修改为babel-preset-env
            npm uninstall --save-dev babel-preset-es2015
            npm install --save-dev babel-preset-env@next

   注释：  

       --save-dev:
        
       当你为你的模块安装一个依赖模块时，正常情况下你得先安装他们（在模块根目录下npm install module-name），然后连同版本号手动将他们添加到模块配置文件package.json中的依赖里（dependencies）。
        
       -save和save-dev可以省掉你手动修改package.json文件的步骤。  
        
        * npm install module-name -save 自动把模块和版本号添加到dependencies部分
        * npm install module-name -save-dve 自动把模块和版本号添加到devDependencies部分

#### 4.打开项目

    使用webstorm等工具打开netty-web-chat项目
        |---node_modules
        |---package.json
        |---package-lock.json

### 5.创建babelrc文件

设置一个.babelrc的文件放在根目录下  
内容：
~~~  
{
  "presets": [
    [
      "@babel/preset-env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "not ie <= 9"
        ]
      }
    }
    ]
  ],
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
~~~

### 6.配置webpack

文件：webpack.config.js  

~~~
module.exports = {
    entry: "./js/main.js",
    output:{
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader"
        }]

    }
}
~~~

### 7.配置package.json

    "scripts": {
        "start": "npm run dev",
        "dev": "webpack-dev-server --config webpack.config.dev.js", //此处修改了webpack.config.js的名字所以需要特殊指定
        "build": "webpack --config webpack.config.dev.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      }
    
    说明：
    (1)dev采用了devServer热部署的形式，可以运行在node的小型服务器上面
    (2)build指定了打包环境以及打包采用的配置，可以将js文件从es6转换成es5

### 8.写入文件内容

此处要注意，默认webpack打包的是局部变量，如果需要在html中之间调用，需要进行变量提升

        function learn(){
            console.log("...");
        }

        window.learn = learn;
        
        或者：
        
        const myFunc = {
            learn(){
                console.log("...");
            },
            work(){
                console.log("...");
            }
        } 
        
        window.myFunc = myFunc;
        
        html中使用：
        
        <button onclick = "window.myFunc.work();">工作</button>

### 9.打包文件

    npm run build
    
## 使用效率    
   
   一些帮助更快速构建html网页的小技巧
    
### 使用html插件

可以更加快速打包html文件,自动装入js，css等静态资源的依赖
    
   * 安装html插件依赖包
   
           npm install -D html-webpack-plugin
    
   * 添加插件
    
           位置：webpack.config.js
                 
                   new HtmlWebpackPlugin({
                       chunks: ['first'],//对应上面entry入口打包出来的first.js
                       template: './webapp/html/one.html',//用于定义模版文件的路径
                       filename: 'one.html',//输出的html文件名，默认为index.html
                       minify: {
                           removeComments: false,
                           collapseWhitespace: false,
                           removeAttributeQuotes: false,
                           minifyJS: false,
                           minifyCSS: false
                       },
                       chunksSortMode: 'auto'
                   })
            
### 使用webpack复制插件

可以将构建过程中不需要编译的文件，但是又需要依赖的文件或者文件夹直接copy过去到编译目录中去

* 安装依赖
        
        npm install copy-webpack-plugin --save-dev
        
* 配置插件
        
   位置：webpack.config.js     
        
        const CopyPlugin = require('copy-webpack-plugin');
        plugins: [
            new CopyPlugin({
              patterns: [
                { from: 'source', to: 'dest' },
                { from: 'other', to: 'public' },
              ],
            }),
          ],        

### 启用热部署

devServer为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能。

* 安装依赖

        npm install webpack-dev-server --save-dev //热更新服务器

* 添加插件

  位置：webpack.config.js
      
        const webpack = require('webpack');
        plugins: [
            new webpack.HotModuleReplacementPlugin(),//热启动插件
        ]

* 修改引用

    如果使用html插件打包，此步骤可以忽略:  
    我们要注意的是：webpack output is served from /。打包输出的文件在服务器的内存里。文件名：bundle.js  
    我们要修改index.html的文件引入路径，改为：<script src="/bundle.js" ></script>
    

* 添加脚本
        
        方式一：
        
        "scripts": {
            "dev": "webpack-dev-server --port 8080 --hot --open --open-page "/dist/index.html" "
        }
        
        方式二：
        
        "scripts": {
             "dev": "webpack-dev-server"
         }
        
        webpackage.config.js中配置
        
        devServer: {
            port:8080,//修改端口为8080
            hot:true,//开启热加载
            open:true,//执行npm run以后会自动打开浏览器
            progress: true,//显示启动进度条
            openPage:"one.html",//指定打开的页面
            contentBase: path.resolve(__dirname,'/dist'),//表示的是告诉服务器从哪里提供内容。（也就是服务器启动的根目录，默认为当前执行目录，一般不需要设置）
            publicPath:'/web-chat/'//对生成目录dist设置的虚拟目录,首先从devServer.publicPath中取值,没有就取output.publicPath的值，否则取默认值"/",也影响利用html-webpack-plugin插件生成的index.html中引用的js、css、img等资源的引用路径。
        }

* 配置启动脚本

   位置：package.json

        "scripts": {
            "dev": "webpack-dev-server --config webpack.config.dev.js"
        ｝        
        
* 运行脚本

        npm run dev

### 优化静态资源访问速度

* 安装压缩插件
    
        npm install uglify-es --save-dev    //压缩js
        npm install clean-css --save-dev    //压缩css
        
* 配置文件配置

        //压缩js文件
        const Uglify = require('uglify-es')
        //压缩css文件
        const CleanCSS = require('clean-css')
        //复制插件
        const CopyWebPackPlugin = require('copy-webpack-plugin');
        
        new CopyWebPackPlugin({
                    patterns: [//可以添加排除文件的选项:globOptions:{ignore:['.*'], copyUnmodified: true}
                        {
                            from: path.resolve(__dirname,"src/static/layui"),
                            to: path.resolve(__dirname,"dist/static/layui")
                        },
                        {
                            from: path.resolve(__dirname,"src/static/img"),
                            to: path.resolve(__dirname,"dist/static/img")
                        },
                        {
                            from: path.resolve(__dirname,"src/static/js"),
                            to: path.resolve(__dirname,"dist/static/js"),
                            transform: function (content) {
                                return Uglify.minify(content.toString()).code //压缩js文件
                            }
                        },
                        {
                            from: path.resolve(__dirname,"src/static/css"),
                            to: path.resolve(__dirname,"dist/static/css"),
                            transform: function (content) {
                                return new CleanCSS({}).minify(content).styles //压缩css文件
                            }
                        }
                    ]
                })       


## 附录完整文件

### 文件目录

   netty-chat-web  
   
    |--->dist
        |--->first.bundle.js
        |--->one.html
        |--->second.bundle.js
        |--->two.html
    |--->node_modules
    |--->webapp
        |--->html
            |--->one.html
            |--->two.html
        |--->js
            |--->first.js
            |--->second.js
    |--->.babelrc
    |--->package.json
    |--->package-lock.json
    |--->webpack.config.dev.js
    |--->webpack.config.prod.js
    |--->webpack.config.test.js

### .babelrc

    {
      "presets": [
        [
          "@babel/preset-env", {
          "targets": {
            "browsers": [
              "last 2 versions",
              "not ie <= 9"
            ]
          }
        }
        ]
      ],
      "plugins": [
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
    }
    
### package.json

(1) npm init 直接在项目根目录文件夹下面执行这个命令，会自动创建一个package.json文件  
(2) npm install 直接执行这个命令，会按照当前目录下的package.json的配置去安装各个依赖的包。
            
    {
      "name": "netty-chat-web",
      "version": "1.0.0",
      "main": "webpack.config.dev.js",
      "dependencies": {},
      "devDependencies": {
        "@babel/core": "^7.4.5",
        "@babel/plugin-proposal-class-properties": "^7.13.0",
        "@babel/preset-env": "^7.4.5",
        "babel-loader": "^8.2.2",
        "cross-env": "^7.0.3",
        "html-webpack-plugin": "^5.3.1",
        "webpack": "^5.33.2",
        "webpack-cli": "^3.3.12",
        "webpack-dev-server": "^3.11.2"
      },
      "scripts": {
        "start": "npm run dev",
        "dev": "webpack-dev-server --config webpack.config.dev.js",
        "build": "webpack --config webpack.config.dev.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "keywords": [],
      "description": ""
    }

### webpack.config.dev.js

    
    //会在根目录下生成一个build文件夹,里面是bundle.js
    //path.resolve()
    //__dirname表示当前文件所在的目录的绝对路径
    const path = require('path');
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
        mode: "development", // "production" | "development" | "none"  // 告诉webpack是生产环境还是开发环境.
        entry: {
            first:'./webapp/js/first.js',//第一个html的入口文件
            second:'./webapp/js/second.js'//第二个html的入口文件
        },//打包入口文件
        output: {                      //打包出口文件
            publicPath:'/web-chat/',//打包生成的html文件里面引用资源的前缀
            path: path.resolve(__dirname,'dist'),//输出的文件夹
            filename: '[name].bundle.js'//输出文件名，后面接上16位hash
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
            new webpack.HotModuleReplacementPlugin(),//热启动插件
            new HtmlWebpackPlugin({
                chunks: ['first'],//对应上面打包出来的login.js
                template: './webapp/html/one.html',//用于定义模版文件的路径
                filename: 'one.html',//输出的HTML文件名，默认为index.html
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
                chunks: ['second'],//对应上面打包出来的login.js
                template: './webapp/html/two.html',//用于定义模版文件的路径
                filename: 'two.html',//输出的HTML文件名，默认为index.html
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
            openPage:"web-chat/one.html",//指定打开的页面
            publicPath:'/web-chat/'//对生成目录dist设置的虚拟目录,首先从devServer.publicPath中取值,没有就取output.publicPath的值，否则取默认值"/",也影响利用html-webpack-plugin插件生成的index.html中引用的js、css、img等资源的引用路径。
        },
        resolve: {//解析后缀，可以require的时候不需要添加后缀
            extensions: ['.js', '.vue', '.json']
        },
    }
    
    












