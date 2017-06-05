/**
 * 抽象按钮
 * @Created by 方雨 on 2017/4/12.
 */
export default {
  props: {
    // 设置 append 属性后, 会在当前（相对）路径前添加基路径。
    // 如: 我们从 /a 导航到一个相对路径 b, 如果没有配置 append, 则路径为 /b; 如果配了, 则为 /a/b
    append: {
      type: Boolean,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // "是否激活" 默认类名的依据是 inclusive match （全包含匹配）。
    exact: {
      type: Boolean,
      default: false,
    },
    // a 链接的地址
    href: {
      type: String,
      default: '',
    },
    // 设置 replace 会调用 router.replace(), 而不是 router.push(), 导航后不会留下 history 记录
    replace: {
      type: Boolean,
    },
    // button 元素的 type属性
    type: {
      type: String,
    },
    // a 标签的 target 属性
    target: {
      type: String,
    },
    // 目标路由的链接
    to: {
      type: [String, Object],
    },
    // 路由标签
    tag: {
      type: String,
      default: 'a',
    },
  },
  methods: {
    getTagName() {
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
      const defaultTag = isFirefox ? 'span' : 'button';

      switch (true) {
        case !!this.to:
          return 'router-link';
        case !!this.href:
          return 'a';
        case !!this.containerElement:
          return this.containerElement;
        default:
          return defaultTag;
      }
    },
  },
  render(h) {
    const attrs = {
      disabled: this.disabled,
    };
    // buttons
    if (this.type) {
      attrs.type = this.type;
    }
    // a 链接
    if (this.href) {
      attrs.target = this.target;

      if (!this.disabled) {
        attrs.href = this.href;
      }
    }
    // 路由
    // 属性参考: https://router.vuejs.org/zh-cn/api/router-link.html
    const props = this.to ? {
      to: this.to,
      tag: this.tag,
      activeClass: this.activeClass,
      exact: this.exact,
      append: this.append,
      replace: this.replace,
    } : {};

    return h(
      this.getTagName(),
      {
        attrs,
        props,
      },
      [
        this.$slots.default,
      ],
    );
  },
};
