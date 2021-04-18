
import {baseUrl} from "./base";
import {request} from "./utils/request";
import {jsonUtil} from "./utils/jsonUtil";

/**
 * 表单提交事件
 */
const initRegisterForm = function () {
    layui.use(['form','laydate'], function() {
        let form = layui.form;
        let laydate = layui.laydate;
        laydate.render({
            elem: '#birthday'
        });

        //自定义验证规则
        form.verify({
            alertValidate : function(value){
                if(value.length < 6){
                    alert('长度至少要6个字符！');
                    return true;
                }
            },//密码二次确认验证器
            confirmPassValidate : function (value) {
                let password2 = $("form input[name=password]").val().trim();
                if(password2!==value){
                    return "请确认两次密码一致！";
                }
            },//长度验证器
            sizeValidate : function(value){
                if(value.length < 3){
                    return '长度至少要3个字符！';
                }
            }
            ,passValidate: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格']
        });

        //监听提交
        //register为事件<button lay-submit lay-filter="register">提交</button>
        form.on('submit(registerSubmit)', function(data){
            //JSON.stringify(data.field)
            doRegister(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

        //给表单赋值
        form.val("registerForm", {
            "passwordQuestion": "您的爸爸叫什么?",
            "passwordAnswer": "张三",
            "icon":"http://",
            "education":"college"
        });

        //获取表单区域所有值
        //formTest 即 class="layui-form" 所在元素属性 lay-filter="registerForm" 对应的值
        //var data1 = form.val("registerForm");

    });
}

/**
 * 用户注册
 */
const doRegister = function(data){
    //去除json中空值
    jsonUtil.slimJson(data);

    let url = baseUrl+"/register";
    let loading = layer.load(0, {
        shade: [0.2,'#1d0202'] //0.1透明度的白色背景
    });
    request.post(url,data,function (res) {
        if(res.success===true){
            setTimeout(function () {
                layer.close(loading);
                layer.msg('恭喜您，注册成功！',{time:1200});
                clearRegisterForm();
                setTimeout(function () {
                    window.location.href = 'login.html';
                },2000);
            },2000)
        }else {
            setTimeout(function () {
                console.log(res);
                layer.close(loading);
                layer.msg(res.message,{time:1200});
            },2000)
        }
    },function (error) {
        console.log(error);
        layer.close(loading);
        layer.msg('Service unavailable!');
    });
};

/**
 * 清空表单
 */
const clearRegisterForm = function (){
    layui.use("form",function () {
        let form = layui.form;
        form.val("registerForm", {
            "nickName":"",
            "userName":"",
            "password":"",
            "password2":"",
            "passwordQuestion": "",
            "passwordAnswer": "",
            "icon":"http://",
            "phone":"",
            "email":"",
            "sex":"male",
            "birthday":"",
            "education":"college",
            "school":"",
            "address":"",
            "signature":""
        });
    });
}

window.Register = {
    initRegisterForm
};
