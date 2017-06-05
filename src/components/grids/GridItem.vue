<template>
  <router-link exact :to="to" tag="a" class="grid__item" @click.native="onClick()">
    <div class="grid__icon" :class="className">
      <slot name="icon">
        <Icon :value="iconName" :color="iconColor" size="md" />
      </slot>
    </div>
    <div class="grid__text">
      <slot name="title">{{title}}</slot>
    </div>
  </router-link>
</template>

<script>
/**
 * 九宫格单项
 * grid-item-line: 内部变线 class. eg: <grid-item class="grid-item-line" />
 */
import Icon from '@/components/icon';

export default {
  name: 'grid-item',
  props: {
    // 自定义 class
    className: {
      type: String,
      default: '',
    },
    // 站外链接
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
    // 路由. 默认值为当前路由
    to: {
      type: [String, Object],
      default: '',
    },
    // 标题名称
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    Icon,
  },
  methods: {
    onClick() {
      if (this.href) {
        window.location.href = this.href;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.grid__item {
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: px2rem(40px) px2rem(20px);
  cursor: pointer;

  &.grid__item--line {
    &:after {
      content: "";
      position: absolute;
      top: px2rem(40px);
      bottom: px2rem(40px);
      right: 0;
      width: 1px;
      background-color: $border-color-base;
    }

    &.grid__item--line {
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  .grid__icon {
    margin-bottom: px2rem(30px);
  }

  .grid__text {
    color: $text-color-second;
  }
}
</style>
