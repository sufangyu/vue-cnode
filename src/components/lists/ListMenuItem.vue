<template>
  <abstract-item
    class="list-menu__item"
    :class="{ 'list-menu__item__line': line }" :href="href" :target="target" :disabled="disabled" :to="to" :tag="tag" :append="append" :replace="replace" :exact="exact"
  >
    <!-- 图标, 小图 -->
    <div class="list-menu__item__thumb" v-if="showIcon">
      <slot name="thumb">
        <Icon v-if="iconName" :value="iconName" :color="iconColor" size="xs" />
      </slot>
    </div>

    <!-- 内容 -->
    <div class="list-menu__item__content">
      <!-- 标题名称 -->
      <div class="list-menu__item__title">
        <slot name="title">{{title}}</slot>
        <div class="list-menu__item__brief" v-if="brief">
          <slot name="brief">{{brief}}</slot>
        </div>
      </div>

      <!-- 拓展内容 -->
      <div class="list-menu__item__extra">
        <slot name="extra"><span>{{extra}}</span></slot>
      </div>

      <!-- 下一步操作引导图标 -->
      <div class="list-menu__item__arrow" v-if="hasArrow">
        <slot name="arrow">
          <i class="icon iconfont icon-arrow-right"></i>
        </slot>
      </div>

    </div>
  </abstract-Item>
</template>

<script>
// TODO: 缩略图自适应尺寸
import Icon from '@/components/icon';
import AbstractItem from './AbstractItem';

export default {
  name: 'list-menu-item',
  props: {
    // 设置 append 属性后, 会在当前（相对）路径前添加基路径。
    // 如: 我们从 /a 导航到一个相对路径 b, 如果没有配置 append, 则路径为 /b; 如果配了, 则为 /a/b
    append: {
      type: Boolean,
    },
    // 副标题说明
    brief: {
      type: String,
      default: '',
    },
    // 是否有边框
    border: {
      type: Boolean,
      default: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 额外信息
    extra: {
      type: String,
      default: '',
    },
    // "是否激活" 默认类名的依据是 inclusive match （全包含匹配）。
    exact: {
      type: Boolean,
      default: false,
    },
    // 是否有缩略图图标
    hasThumb: {
      type: Boolean,
      default: false,
    },
    // 是否隐藏 arrow
    hasArrow: {
      type: Boolean,
      default: true,
    },
    // a 链接的地址
    href: {
      type: String,
      default: '',
    },
    // 图标名称
    iconName: {
      type: String,
      default: '',
    },
    // 图标颜色
    iconColor: {
      type: String,
    },
    // 分割线
    line: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 设置 replace 会调用 router.replace(), 而不是 router.push(), 导航后不会留下 history 记录
    replace: {
      type: Boolean,
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
    // 图标 class
    iconClassName() {
      return this.iconName ? `icon-${this.iconName}` : '';
    },
    // 是否有图标 class
    showIcon() {
      return this.iconName || this.hasThumb;
    },
  },
  components: {
    Icon, AbstractItem,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.list-menu__item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-self: stretch;
  align-items: center;
  color: inherit;

  &:hover {
    color: inherit;
  }

  &:active {
    background-color: $list-menu-background-color-active;
  }

  // 禁用
  &[disabled="disabled"] {
    .list-menu__item__thumb,
    .list-menu__item__title,
    .list-menu__item__extra,
    .list-menu__item__arrow {
      opacity: $list-menu-disabled-opacity;
    }

    &:active {
      background-color: $transparent;
    }
  }

  // 边框间隔线
  &.list-menu__item__line {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid $list-menu-border-color;
      display: none;
    }
  }

  // 图标, 缩略图
  .list-menu__item__thumb {
    padding-left: $space-blank-base;

    .icon {
      font-size: 1.2em;
    }

    img {
      display: block;
      width: px2rem(48px);
      height: px2rem(48px);
      vertical-align: middle;
    }
  }

  // 内容
  .list-menu__item__content {
    position: relative;
    min-height: px2rem(120px);
    padding: px2rem(20px) 0;
    margin-left: $space-blank-base;
    flex: 1;
    display: flex;
    align-self: stretch;
    align-items: center;
    max-height: 9999px;  // 解决文字内容多的时候, 字体会变大

    // 副标题说明
    .list-menu__item__title {
      flex: 1;
      line-height: 1.4;

      span {
        vertical-align: middle;
      }
    }

    // 副标题说明
    .list-menu__item__brief {
      color: $list-menu-text-color-brief;
      font-size: 0.8em;
    }
  }

  // 额外信息
  .list-menu__item__extra {
    color: $list-menu-text-color-extra;
    font-size: 0.8em;
    text-align: right;
    padding: 0 $space-blank-sm 0 $space-blank-base;

    span {
      vertical-align: middle;
    }
  }

  // 下一步操作引导图标
  .list-menu__item__arrow {
    padding-right: $space-blank-base;
    color: $list-menu-text-color-arrow;
    font-size: 0.8em;
  }
}
</style>
