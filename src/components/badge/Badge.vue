<template>
  <span class="badge" :class="badgeInternalClass">
    <slot></slot>
    <sup v-if="showBadgeSup" v-show="!dot || (dot && !hideDot)" :class="{ 'badge-count': !dot, 'badge-dot': dot}">{{badgeText}}</sup>
  </span>
</template>

<script>
/**
 * 徽标数. 图标右上角的红点、数字或者文字。用于告知用户，该区域的状态变化或者待处理任务的数量
 * eg:
 * 1. 当用户只需知道大致有内容更新时，应该使用红点型，如：社交中的群消息通知。
 * 2. 当用户有必要知晓每条更新时，应该使用数字型。如：社交中的一对一的消息通知。
 */
import { convertClass } from '@/utils';

export default {
  name: 'badge',
  props: {
    // 自定义的 class名称, dot 模式下无效
    badgeClass: {
      type: [String, Object],
    },
    // 颜色
    color: {
      type: String,
    },
    // 不展示数字，只有一个小红点角标
    dot: {
      type: Boolean,
      default: false,
    },
    // 是否是角标
    float: {
      type: Boolean,
      default: false,
    },
    // 是否隐藏小红点角标
    hideDot: {
      type: Boolean,
      default: false,
    },
    // 展示封顶的数字值
    overflowCount: {
      type: Number,
      default: 99,
    },
    // 颜色是否为主色
    primary: {
      type: Boolean,
      default: false,
    },
    // 是否为圆角
    radius: {
      type: Boolean,
      default: false,
    },
    // 颜色是否为强调色
    secondary: {
      type: Boolean,
      default: false,
    },
    // 展示的数字或文案. 当为数字, 大于 overflowCount 时, 显示为 ${overflowCount}+; 为 0 时隐藏
    text: {
      type: [String, Number],
    },
    // 颜色是否为透明
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    badgeText() {
      let badgeText = this.text;
      if (this.dot) {
        // 不展示数字，只有一个小红点
        badgeText = '';
      } else if (typeof this.text === 'number' && this.text > this.overflowCount) {
        // 展示数字，超过限制值时, 显示 "99+"
        badgeText = `${this.overflowCount}+`;
      }
      return badgeText;
    },
    showBadgeSup() {
      if (this.dot) {
        return true;
      }
      return this.text !== 0;
    },
    // 计算后的 className 集合
    badgeInternalClass() {
      const { radius, transparent, primary, secondary, badgeClass } = this;
      // 是否是角标. 有 slot, 并且没有 name 的 slot 数量大于 0
      const isAngle = this.$slots && this.$slots.default && this.$slots.default.length > 0;
      const classNames = [];
      if (radius) {
        classNames.push('badge-radius');
      }
      if (isAngle) {
        classNames.push('badge-float');
      }
      if (transparent) {
        classNames.push('badge-transparent');
      }
      if (primary) {
        classNames.push('badge-primary');
      }
      if (secondary) {
        classNames.push('badge-secondary');
      }
      return classNames.concat(convertClass(badgeClass));
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";
// 默认有底色
.badge {
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;

  sup {
    top: 0;
    display: inline-block;
    margin: 0 px2rem(10px);
    color: $badge-text-color;
    background-color: $badge-color-base;
    border-radius: $badge-size-count;
    vertical-align: middle;
    white-space: nowrap;
    box-shadow: 0 0 0 1px $badge-shadow-color;
  }

  // 文字
  .badge-count {
    padding: 0 px2rem(10px);
    min-width: $badge-size-count;
    height: $badge-size-count;
    line-height: $badge-size-count;
    text-align: center;
    font-size: $badge-font-size;
  }

  // 点
  .badge-dot {
    top: -0.1em;
    display: inline-block;
    height: $badge-size-dot;
    width: $badge-size-dot;
    line-height: 1;
    padding: 0;
    border-radius: 50%;
  }

  // 圆角
  &.badge-radius {
    .badge-count {
      border-radius: $border-radius-sm;
    }
  }
}
// 主颜色
.badge-primary {
  .badge-count, .badge-dot {
    background-color: $badge-color-primary;
  }
}
// 强调色
.badge-secondary {
  .badge-count, .badge-dot {
    background-color: $badge-color-secondary;
  }
}

// 透明
.badge-transparent {
  // 默认色
  .badge-count, .badge-dot {
    background-color: $badge-color-transparent;
    color: $badge-color-base;
    border: 1px solid $badge-color-base;
  }

  // 主颜色
  &.badge-primary {
    .badge-count, .badge-dot {
      color: $badge-color-primary;
      border: 1px solid $badge-color-primary;
    }
  }

  // 强调色
  &.badge-secondary {
    .badge-count, .badge-dot {
      color: $badge-color-secondary;
      border: 1px solid $badge-color-secondary;
    }
  }
}
// 角标
.badge-float {
  .badge-count, .badge-dot {
    margin: 0;
    position: absolute;
    z-index: $zindex-affix;
  }

  .badge-count {
    top: - ($badge-size-count/2);
    right: - ($badge-size-count/2);
  }
  .badge-dot {
    top: - ($badge-size-dot/2);
    right: - ($badge-size-dot/2);
  }
}
</style>
