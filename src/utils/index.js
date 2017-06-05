import * as colorsObj from './colors';

/**
 * 获取颜色名称对应的颜色值
 * @param color
 * @returns {*}
 */
const colors = Object.keys(colorsObj);
function getColor(color) {
  if (!color) {
    return '';
  }
  return colors.indexOf(color) !== -1 ? colorsObj[color] : color;
}


/**
 * 获取浏览器相关信息
 * @type {{info: {mobile, android, ios, iPhone, iPad, weixin, qq}, language: string}}
 */
const browser = {
  info() {
    const UA = navigator.userAgent;
    return {
      mobile: !!UA.match(/AppleWebKit.*Mobile.*/),  // 是否为移动终端
      android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1, // android终端
      ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      iPhone: UA.indexOf('iPhone') > -1,         // 是否为iPhone或者QQHD浏览器
      iPad: UA.indexOf('iPad') > -1,             // 是否iPad
      weixin: UA.indexOf('MicroMessenger') > -1, // 是否微信浏览器
      qq: UA.match(/\sQQ/i) === 'qq',            // 是否QQ浏览器
    };
  },
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};

/**
 * 判断目标是否是函数
 * @param val
 * @returns {boolean}
 */
function isFunction(target) {
  return typeof target === 'function';
}

/**
 * 将 String, Object, Array 转成 Array
 */
function convertClass(classes) {
  let newClasses = [];
  if (!classes) {
    return newClasses;
  }
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes);
  } else {
    newClasses = newClasses.concat(classes.split(' '));
  }
  return newClasses;
}

export {
  browser,
  isFunction,
  convertClass,
  getColor,
};
