import Vue from 'vue'
let v = new Vue();

export function createLoading(text) {
    return v.$loading({
        lock: true,
        text: text || '请稍等',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

export function getToken() {
    return sessionStorage.getItem('token')
}

export function getCurrentUser() {
    return sessionStorage.getItem('username')
}

export function getRows(num, cols) {
    let i = 0;
    if (!num) {
        return i
    } else if (num % cols !== 0) {
        i = parseInt(num / cols) + 1
    } else {
        i = num / cols
    }
    return i
}

export function byteWithUnitFloat(num) {
    if (!num) {
        return {
            quota: 0,
            rate: 0,
            unit: "B"
        }
    }
    if (num / (1024 * 1024 * 1024 * 1024 * 1024) >= 1) {
        return {
            quota: (num / ( 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2),
            rate: 1024 * 1024 * 1024 * 1024 * 1024,
            unit: "PB"
        }
    } else if (num / (1024 * 1024 * 1024 * 1024) >= 1) {
        return {
            quota: (num / ( 1024 * 1024 * 1024 * 1024)).toFixed(2),
            rate: 1024 * 1024 * 1024 * 1024,
            unit: "TB"
        }
    } else if (num / (1024 * 1024 * 1024) >= 1) {
        return {
            quota: (num / ( 1024 * 1024 * 1024)).toFixed(2),
            rate: 1024 * 1024 * 1024,
            unit: "GB"
        }
    } else if (num / (1024 * 1024) >= 1) {
        return {
            quota: (num / ( 1024 * 1024 )).toFixed(2),
            rate: 1024 * 1024,
            unit: "MB"
        }
    } else if (num / (1024) >= 1) {
        return {
            quota: (num / ( 1024 )).toFixed(2),
            rate: 1024,
            unit: "KB"
        }
    } else {
        return {
            quota: num,
            rate: 1,
            unit: "B"
        }
    }
}

export function formatterVantDatePicker(type, val) {
    if (type === 'year') {
        return val + '年';
    }
    if (type === 'month') {
        return val + '月';
    }
    if (type === 'day') {
        return val + '日';
    }
    if (type === 'hour') {
        return val + '时';
    }
    if (type === 'minute') {
        return val + '分';
    }
    return val;
}

export function getRecentFive(num) {
    let result = 5;
    if (num) {
        if (num % 5 === 0) {
            result = num
        } else {
            result = (parseInt(num / 5) + 1) * 5
        }
    }
    return result
}

export function getArrayMax(array) {
    if (array.length === 0) {
        return 0
    } else {
        return Math.max.apply(this,array)
    }
}

export function downloadByTagA(url) {
    // const a = document.createElement('a')
    // a.href = url
    // a.click()
    const elink = document.createElement('a')
    elink.style.display = 'none'
    elink.href = url
    // elink.href = URL.createObjectURL(url)
    document.body.appendChild(elink)
    elink.click()
    // URL.revokeObjectURL(elink.href) // 释放URL 对象
    // document.body.removeChild(elink)
}

export function downloadByOpen(url) {
    const windowOpen = window.open(url)
    if (windowOpen == null || typeof(windowOpen)=='undefined'){
        v.$message('浏览器阻止窗口打开已被开启，请关闭该选项');
    }
    // window.open(url, '_self')
}

export function copyURL(text) {
    let textNode = document.createElement("span");
    textNode.innerHTML = text
    document.getElementsByTagName('body')[0].appendChild(textNode)
    let range = document.createRange()
    range.selectNodeContents(textNode)
    let selection = document.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('Copy')
    textNode.remove()
    v.$message({
        message: '复制成功',
        type: 'success'
    });
}

export function minuteToOther(time) {
    time = parseInt(time)
    let hour = Math.floor(time / 60)
    let minute = time - hour * 60
    return {
        hour,
        minute,
        string: `${hour ? `${hour}小时` : ''}${minute ? `${minute}分钟` : ''}`
    }
}

export function secondToOther(time) {
    time = parseInt(time)
    let hour = Math.floor(time / 3600)
    let minute = Math.floor((time - hour * 3600) / 60)
    let second = time - hour * 3600 - minute * 60
    return {
        hour,
        minute,
        second,
        string: `${hour ? `${hour}小时` : ''}${minute ? `${minute}分钟` : ''}${second ? `${second}秒` : ''}`
    }
}

export function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key]!==null) {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

export function formatDate(date, formatString) {
    if (!date) {
        return ''
    }
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return formatString ? 
        formatString.replace(/yyyy/g, year).replace(/mm/g, month).replace(/dd/g, day).replace(/HH/g, hour).replace(/MM/g, minute).replace(/SS/g, second)
        : `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function validateInput(type) {
    if (typeof(type) !== 'string' && type.type === 'trim') {
        return (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error(type.message));
            } else {
                callback()
            }
        }
    } else {
        switch (type) {
            case 'password':
                return (rule, value, callback) => {
                    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                    if (!reg.test(value)) {
                        callback(new Error('密码包含数字和英文各1种以上，长度6-20'));
                    } else {
                        callback()
                    }
                }
            case 'username':
                return (rule, value, callback) => {
                    const reg = /^[a-zA-Z0-9\_\-\.]{4,16}$/
                    if (!reg.test(value.trim())) {
                        callback(new Error('用户名为4到20位,包含字母,数字、-、_、.'));
                    } else {
                        callback()
                    }
                }
            case 'mobile':
                return (rule, value, callback) => {
                    const reg = /^\d{1,20}$/
                    if (!reg.test(value.trim())) {
                        callback(new Error('请输入数字，最大长度20'));
                    } else {
                        callback()
                    }
                }
            case 'email':
                return (rule, value, callback) => {
                    const reg = /^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/
                    if (!reg.test(value.trim())) {
                        callback(new Error('请输入正确的邮箱格式'));
                    } else if (value.trim().length > 30) {
                        callback(new Error('最大长度30'));
                    } else {
                        callback()
                    }
                }
            case 'ownername':
                return (rule, value, callback) => {
                    if (value.trim().length > 20) {
                        callback(new Error('最大长度20'));
                    } else {
                        callback()
                    }
                }
            default:
                break;
        }
    }

}

export function changeDateAndroidIos(value) {
    let arr = value.split(/[- : -]/)
    const date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4])
    return date
}

export function getWechatCode(config) {
    let defaultConfig = {
        appid: 'wxda30931f8ebfdef2',
        responseType: 'code',
        redirect_uri: '',
        error_uri: '',
        scope: 'snsapi_base',
    }
    let finalConfig = Object.assign(defaultConfig, config)
    let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    finalConfig.redirect_uri = encodeURIComponent(finalConfig.redirect_uri)
    let authParams = `?appid=${finalConfig.appid}&redirect_uri=${finalConfig.redirect_uri}&response_type=${finalConfig.responseType}&scope=${finalConfig.scope}#wechat_redirect`;
    window.location.href = authPageBaseUri + authParams;
}