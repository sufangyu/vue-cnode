<template>
  <abstract-button
    class="button"
    :class="[typeClass, sizeClass, buttonInternalClass, shadowDepthClass ]"
    :style="buttonStyle" :type="nativeType" :href="href" :target="target" :disabled="disabled" :to="to" :tag="tag" :append="append" :replace="replace" :exact="exact"
  >
    <span class="button__label" :class="labelClass" v-if="label && labelPosition === 'before' && !circle">{{label}}</span>
    <icon class="button__icon" v-if="icon" :class="iconClass" :value="icon" size="xxs"></icon>
    <slot></slot>
    <span class="button__label" :class="labelClass" v-if="label && labelPosition === 'after' && !circle">{{label}}</span>
  </abstract-button>
</template>

<script>
import { getColor } from '@/utils';

import AbstractButton from './AbstractButton';
import Icon from '../icon';

export default {
  name: 'buttons',
  props: {
    // 设置 append 属性后, 会在当前（相对）路径前添加基路径。
    // 如: 我们从 /a 导航到一个相对路径 b, 如果没有配置 append, 则路径为 /b; 如果配了, 则为 /a/b
    append: {
      type: Boolean,
    },
    // 自定义背景颜色
    backgroundColor: {
      type: String,
      default: '',
    },
    // 自定义文字颜色
    color: {
      type: String,
      default: '',
    },
    // 是否圆形. 只适合纯图标
    circle: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // "是否激活" 默认类名的依据是 inclusive match （全包含匹配）。
    exact: {
      type: Boolean,
      default: true,
    },
    // 是否将宽度设置为 100%
    fullWidth: {
      type: Boolean,
      default: false,
    },
    // a 链接的地址
    href: {
      type: String,
      default: '',
    },
    // 图标
    icon: {
      type: String,
      default: '',
    },
    // 图标的样式, 同 class 绑定方式一致
    iconClass: {
      type: String,
      default: '',
    },
    // 文字
    label: {
      type: String,
    },
    // 文字位置
    labelPosition: {
      type: String,
      default: 'after',
    },
    // 文字 class
    labelClass: {
      type: [String, Array, Object],
      default: '',
    },
    // button 元素的原生 type属性
    nativeType: {
      type: String,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    // 半圆角
    radius: {
      type: Boolean,
      default: false,
    },
    // 设置 replace 会调用 router.replace(), 而不是 router.push(), 导航后不会留下 history 记录
    replace: {
      type: Boolean,
    },
    // 尺寸
    size: {
      type: String,
      default: 'md',   // sm, md, lg
    },
    // 投影
    shadow: {
      type: Boolean,
      default: false,
    },
    // 阴影深度
    shadowDepth: {
      type: Number,
      default: 1,
    },
    // 按钮类型
    type: {
      type: String,
      default: 'link',  // link: 链接, flat: 扁平, ghost: 幽灵
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
  computed: {
    buttonInternalClass() {
      return {
        'button--primary': this.primary,
        'button--secondary': this.secondary,
        'button--disabled': this.disabled,
        'button--full': this.fullWidth,
        'button--shadow': this.shadow,
        'button--radius': this.radius,
        'button--circle': this.circle,
      };
    },
    // 类型
    typeClass() {
      return `button--type-${this.type}`;
    },
    // 尺寸大小
    sizeClass() {
      return this.size === 'md' ? '' : `button--size-${this.size}`;
    },
    // 阴影深度
    shadowDepthClass() {
      return this.shadow ? `shadow--depth-${this.shadowDepth}` : '';
    },
    // 自定义颜色
    buttonStyle() {
      return {
        color: getColor(this.color),
        backgroundColor: getColor(this.backgroundColor),
      };
    },
  },
  components: {
    AbstractButton, Icon,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.button {
  user-select: none;
  outline: none;
  border: none;
  cursor: pointer;
  -webkit-appearance: none;
  margin: 0;
  font-size: 0;
  white-space: nowrap;
  font-weight: 400;
  display: inline-block;
  vertical-align: middle;
  height: $button-size-md;
  line-height: $button-size-md;
  padding: 0 px2rem(35px);
  text-align: center;
  border: 1px solid $button-color-transparent;
  color: $button-color-normal;
  background-color: $button-color-transparent;
  border-radius: px2rem(6px);
  transition: opacity 0.25s ease-in-out, color 0.25s ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  // 图标
  &__icon {
    vertical-align: middle;
    + .button__label {
      margin-left: px2rem(8px);
    }
  }
  // 文字
  &__label {
    font-size: px2rem(32px);
    vertical-align: middle;
    + .button__icon {
      margin-left: px2rem(8px);
    }
  }

  // 主要
  &--primary {
    color: $button-color-primary;
  }
  // 辅助
  &--secondary {
    color: $button-color-secondary;
  }
  // 禁用
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.45;
  }

  // 扁平类型
  &--type-flat {
    border-color: $button-color-flat-normal;
    background-color: $button-color-flat-normal;

    &.button--primary {
      color: $button-text-color-abrupt;
      border-color: $button-color-primary;
      background-color: $button-color-primary;
    }
    &.button--secondary {
      color: $button-text-color-abrupt;
      border-color: $button-color-secondary;
      background-color: $button-color-secondary;
    }
  }

  // 幽灵类型
  &--type-ghost {
    border-color: $button-color-ghost-normal;
    background-color: $button-color-transparent;

    &.button--primary {
      border-color: $button-color-primary;
      background-color: $button-color-transparent;
    }
    &.button--secondary {
      border-color: $button-color-secondary;
      background-color: $button-color-transparent;
    }
  }

  // 满屏
  &--full {
    width: 100%;
    padding: 0;
  }

  // 小尺寸
  &--size-sm {
    height: $button-size-sm;
    line-height: $button-size-sm;
    padding: 0 px2rem(25px);

    .button__icon {
      font-size: px2rem(28px);

      + .button__label {
        margin-left: px2rem(6px);
      }
    }

    .button__label {
      font-size: px2rem(24px);

      + .button__icon {
        margin-right: px2rem(6px);
      }
    }
  }
  // 大尺寸
  &--size-lg {
    height: $button-size-lg;
    line-height: $button-size-lg;
    padding: 0 px2rem(45px);

    .button__icon {
      font-size: px2rem(40px);
    }

    .button__label {
      font-size: px2rem(36px);
    }
  }

  // 半圆角
  &--radius {
    border-radius: 9999px;
  }

  // 圆形
  &--circle {
    width: $button-size-md;
    padding: 0;
    border-radius: 9999px;

    &.button--size-sm {
      width: $button-size-sm;
    }

    &.button--size-lg {
      width: $button-size-lg;
    }
  }
}
</style>
