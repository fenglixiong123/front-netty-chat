
import {baseUrl} from "./base";
import {request} from "./utils/request";

const initLoginForm = function () {
    layui.use('form', function() {

        let form = layui.form;

        //验证规则
        form.verify({
            sizeValidate : function(value){
                if(value.length < 5){
                    return '用户名不少于5个字符';
                }
            }
            ,passValidate: [/^[\S]{6,12}$/,'密码必须6到12位！']
        });

        //监听提交
        form.on('submit(loginSubmit)', function(data){
            doLogin(data.field);
            return false;
        });

    });
}

/**
 * 用户登录操作
 */
const doLogin = function(data){
    //此处进行登录验证，请求后台服务器获取用户信息
    let url = baseUrl+"/login";
    let loading = layer.load(0, {
        shade: [0.2,'#1d0202'] //0.1透明度的白色背景
    });
    request.post(url,data,function (res) {
        if(res.success===true){
            setTimeout(function () {
                layer.close(loading);
                layer.msg('恭喜您，登录成功！',{time:1200});
                clearLoginForm();
                setTimeout(function () {
                    //登录成功，跳转聊天页面
                    // window.location.href = "chat.html?nick=" + encodeURI(encodeURI(message));
                },2000);
            },1000)
        }else {
            setTimeout(function () {
                console.log(res);
                layer.close(loading);
                layer.msg(res.message,{time:1200});
            },3000)
        }
    },function (error) {
        console.log(error);
        layer.close(loading);
        layer.msg('Service unavailable!');
    });
};

/**
 * 清理登录表单
 */
const clearLoginForm = function () {
    layui.use("form",function () {
        let form = layui.form;
        form.val("loginForm", {
            "username":"",
            "password":""
        });
    });
}

/**
 * 跳转注册页面
 */
const register = function(){
    window.location.href = 'register.html';
}

/**
 * 忘记密码功能
 */
const forgetPass = function(){
    layer.alert("功能升级中...")
}

window.Login = {
    initLoginForm,
    register,
    forgetPass
};

