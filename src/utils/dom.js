/**
 * Created by 方雨 on 2017/4/6.
 */

/**
 * 是否有 className
 * @param element
 * @param cls
 * @returns {boolean}
 */
function hasClass(element, cls) {
  const $element = element;
  const clssName = cls || '';

  // 当 clssName 没有参数时，返回 false
  if (clssName.replace(/\s/g, '').length === 0) {
    return false;
  }
  return new RegExp(` ${clssName} `).test(` ${$element.className} `);
}

/**
 * 添加 className
 * @param element
 * @param cls
 */
function addClass(element, cls) {
  const $element = element;
  const clssName = cls;

  if (!hasClass($element, clssName)) {
    $element.className = $element.className === '' ? clssName : `${$element.className} ${clssName}`;
  }
}

/**
 * 移除 className
 * @param element
 * @param cls
 */
function removeClass(element, cls) {
  const $element = element;
  const clssName = cls;

  if (hasClass($element, clssName)) {
    let newClass = ` ${$element.className.replace(/[\t\r\n]/g, '')} `;
    while (newClass.indexOf(` ${clssName} `) >= 0) {
      newClass = newClass.replace(` ${clssName} `, ' ');
    }
    $element.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}


export {
  hasClass,
  addClass,
  removeClass,
};
