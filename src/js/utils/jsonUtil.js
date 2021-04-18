/**
 * 解析json字符串
 * @param jsonStr
 * @returns {any}
 */
function toJson(jsonStr) {
    return JSON.parse(jsonStr);
}

/**
 * json转换为字符串
 * @param data
 * @param replacer
 * @returns {string}
 */
function toString(data,replacer) {
    return JSON.stringify( data ,replacer);
}

/**
 * 去掉json中空值
 * @param object
 */
function slimJson(object){
    for (let key in object) {
        let value = object[key];
        if (typeof value === 'object') {
            if (Array.isArray(value) && value.length === 0) {
                delete object[key];
                continue;
            }
            slimJson(value);
            if (isEmpty(value)) {
                delete object[key];
            }
        } else if (value === '' || value === null || value === undefined) {
            delete object[key];
        } else {
        }
    }
}

/**
 * 判断对象是否是空对象
 * @param object
 * @returns {boolean}
 */
function isEmpty(object) {
    for (let name in object) {
        return false;
    }
    return true;
}

const jsonUtil = {
    slimJson,toJson,toString
};

export {jsonUtil}
