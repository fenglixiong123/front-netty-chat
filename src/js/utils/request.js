/**
 * 请求工具类
 */
const request = {
    /**
     * 带参数的get请求
     * @param url 地址
     * @param data 请求数据
     * @param success 成功回调
     * @param error 失败回调
     */
    get(url,data,success,error){
        error = requireError(error);
        $.ajax({
            url:url,
            type:'get',
            data:data,
            dataType:"json",
            success:success,
            error:error
        })
    },
    /**
     * 带参数的post请求
     * @param url 地址
     * @param data 请求数据
     * @param success 成功回调
     * @param error 失败回调
     * dataType:"json"//服务端返回的数据类型
     * contentType:'application/json;charset=UTF-8',//发送的数据类型
     */
    post(url,data,success,error){
        error = requireError(error);
        $.ajax({
            url:url,
            type:'post',
            data:JSON.stringify(data),
            dataType:"json",
            contentType:'application/json;charset=UTF-8',
            success:success,
            error:error
        })
    },
    /**
     * 带参数的put请求
     * @param url 地址
     * @param data 请求数据
     * @param success 成功回调
     * @param error 失败回调
     */
    put(url,data,success,error){
        // data._method = 'put';
        error = requireError(error);
        $.ajax({
            url:url,
            type:'put',
            data:JSON.stringify(data),
            dataType:"json",
            contentType:'application/json;charset=UTF-8',
            success:success,
            error:error
        })
    },
    /**
     * 带参数的delete请求
     * @param url 地址
     * @param data 请求数据
     * @param success 成功回调
     * @param error 失败回调
     */
    delete(url,data,success,error){
        // data._method = 'delete';
        error = requireError(error);
        $.ajax({
            url:url,
            type:'delete',
            data:JSON.stringify(data),
            dataType:"json",
            contentType:'application/json;charset=UTF-8',
            success:success,
            error:error
        })
    },
    /**
     * 获取当前地址请求参数中的参数值
     * @return {string}
     * @param name 参数名
     */
    getQueryString(name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return unescape(decodeURI(decodeURI(r[2])));
        }
        return "";
    }
};

/**
 * 默认失败处理函数
 * @param errorFunc 传入的失败处理函数
 * @returns 新的失败处理函数
 */
function requireError(errorFunc) {
    if(!errorFunc){
        return function (error) {
            layer.msg('Service unavailable!');
            console.log(error);
        };
    }
    return errorFunc;
}

export {request};
