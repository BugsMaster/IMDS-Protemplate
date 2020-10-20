/*
 * @Author: dxma 
 * @Date: 2020-08-07 14:02:59 
 * @Last Modified by: dxma
 * @Last Modified time: 2020-08-17 17:37:18
 */


const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function assertType(type,value) {
  let valid
  const expectedType = getType(type)
  
  if (simpleCheckRE.test(expectedType)) {
    const t = typeof value
    valid = t === expectedType.toLowerCase()
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type
    }
  } else if (expectedType === 'Object') {
    valid =   Object.prototype.toString.call(value).slice(8, -1) === "Object";
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value) 
  } else {
    valid = value instanceof type
  }
  
  return {
    valid,
    expectedType
  }
  
}

/*
* @description 验证传来的属性和组件自己定义的属性是否匹配 
* @params rule { Object }  组件自己定义的属性
* rule格式如下
*  rule={
      data: {
              type: Array,  类型 必填
              required: true, 是否必填 必填
              default: [],   默认值  非必填
            }, 
}
* @params params  { Object }  调用组件时传进来的
* @return 方法返回值 params
*/
function validateConfig(rule, params={}) {
  for (const key in rule) {
    // 判断是否必输
    if (rule[key].required && !hasOwn(params, key)) {
      console.warn(
        'Missing required prop: "' + key + '"',
      )
    }

    // 填充默认值
    if (hasOwn(rule[key], "default") && !hasOwn(params, key)) {
      params[key] = rule[key].default;
    }
    // 判断类型
    const assertedType = assertType(rule[key].type,params[key]);
    if (!assertedType.valid) {
      console.warn(`Invalid prop: type check failed for prop "${key}" Expected ${assertedType.expectedType}`)
    }
  }
  return params;
}


export default validateConfig;
