<template>
  <div class="nav-bar" :class="navBarInternalClass">
    <div class="nav-bar__content">
      <div class="nav-bar__left">
        <slot name="left">
          <a href="javascript:;" @click="goback">
            <icon value="goback" size="xs"/>
            <span v-if="backText">{{backText}}</span>
          </a>
        </slot>
      </div>
      <div class="nav-bar__title">{{ title }}</div>
      <div class="nav-bar__right">
        <slot name="right">
        </slot>
      </div>
    </div>
    <div class="nav-bar__placeholder" v-if="fixed"></div>
  </div>
</template>

<script>
import Icon from '@/components/icon';

import goback from '@/mixins/goback';

export default {
  name: 'nav-bar',
  mixins: [goback],
  props: {
    // 后退文字
    backText: {
      type: String,
    },
    // 是否固定
    fixed: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
    },
    // 标题是否居中
    titleCenter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    navBarInternalClass() {
      return {
        'nav-bar--fixed': this.fixed,
        'nav-bar__title--center': this.titleCenter,
      };
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.nav-bar {
  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 px2rem(20px);
    height: $nav-bar-height;
    line-height: $nav-bar-height;
    color: $nav-bar-text-color;
    font-size: $nav-bar-font-size;
    background-color: $nav-bar-background-color;
  }

  a {
    display: inline-block;
    padding: 0 px2rem(16px);
    height: 100%;
    line-height: $nav-bar-height;
    color: $nav-bar-text-color;
  }

  span {
    margin-left: px2rem(16px);
  }

  &__title {
    flex: 1;
    padding-left: px2rem(16px);
    padding-right: px2rem(16px);
    font-size: $nav-bar-font-size-title;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__left, &__right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 0;
    height: 100%;
    line-height: 100%;
  }

  &__right {
    justify-content: flex-end;
  }
  // 占位
  &__placeholder {
    height: $nav-bar-height;
    display: none;
  }

  // 固定顶部
  &--fixed {
    .nav-bar__content {
      position: fixed;
      left: 0;
      right: 0;
      z-index: $zindex-bar;
    }
    .nav-bar__placeholder {
      display: block;
    }
  }

  // 标题居中显示
  &__title--center {
    .nav-bar__title {
      text-align: center;
    }
    .nav-bar__left {
      flex: 1;
    }
    .nav-bar__right {
      flex: 1;
    }
  }
}
</style>
