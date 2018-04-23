export const mobile = (text = '请输入正确的手机号码') => {
  return {
      trigger: 'blur',
      validator(rule, value, callback) {
        let error = []
        if (!(/^1[34578]\d{9}$/.test(value))) {
          error.push(new Error(text))
        }
        callback(error);
      }
    }
}
export const empty = (text = '内容不能为空') => {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error(text))
      }
      callback()
    }
  }
}
export const validate = (validateInt , text = '验证码错误') => {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (value != validateInt) {
        callback(new Error(text))
      }
      callback()
    }
  }
}

export const textLength = (args) => {
  return {
    trigger: 'change',
    validator: (rule, value, callback) => {
      if (args.max && value.length > args.max) {
        const text = args.maxText ? args.maxText : `输入的最大数量为${args.max}`
        callback(new Error(text))
        return
      }
      if (args.min && value.length < args.min) {
        const text = args.minText ? args.minText : `输入的最小数量为${args.min}`
        callback(new Error(text))
        return
      }
      if (args.num && value.length != args.num) {
        const text = args.numText ? args.numText : `输入的文字长度应为${args.num}`
        callback(new Error(text))
        return
      }
      callback()
    }
  }
}

//正整数 包括零
export const number = (text = '输入正取的数字') => {
  return {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (!/^[0-9]*$/.test(value)) {
        callback(new Error(text))
      }
      callback()
    }
  }
}
/* eslint-disable */
//正浮点数 包括零
export const flowNumber = (text = '输入正取的数字') => {
  return {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        callback(new Error(text))
      }
      callback()
    }
  }
}
//正浮点数 保留2位小时
export const flowNumber2 = (text = '最多保留两位小数') => {
  return {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        callback(new Error(text))
      }
      callback()
    }
  }
}
//正浮点数 保留2位小时
export const passWord = (text = '密码必须为数字+字母 至少6位') => {
  return {
    trigger: 'change',
    validator(rule, value, callback) {
      var reg = RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/)
      if (!reg.test(value)) {
          callback(new Error(text))
          return
      }
      if (value.length < 6) {
        callback(new Error('密码最少6位'))
        return
      }
      callback()
    }
  }
}


export const abs0 = (absVal= 1.5) => {
  return {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (!/^[0-9]*$/.test(Number(value) / absVal)) {
        callback(new Error(`请输入${absVal}的倍数`))
      }
      callback()
    }
  }
}
export const get0 = (val = 1.5) => {
  return {
    trigger: 'blur',
    validator(rule, value, callback) {
      if (Number(value) < val) {
        callback(new Error(`请最小输入${val}`))
      }
      callback()
    }
  }
}
