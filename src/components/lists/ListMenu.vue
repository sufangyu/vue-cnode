<template>
  <div class="list-menu" :class="{ 'list-menu--line': line, 'list-menu--line__full': fullLine }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 列表菜单
 * list-menu-line: 缩进边框间隔线
 * list-menu-line__full: 缩进边框间隔线
 */
export default {
  name: 'list-menu',
  props: {
    // 满屏分割线
    fullLine: {
      type: Boolean,
      default: false,
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
  },
  computed: {
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 缩进边框间隔线
.list-menu--line {
  .list-menu__item__content {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid $list-menu-border-color;
    }
  }

  // 最后一项没有边框间隔线
  .list-menu__item {
    &:last-child {
      .list-menu__item__content {
        &:after {
          display: none;
        }
      }
    }
  }
}

// 满屏边边框间隔线
.list-menu--line__full {
  .list-menu__item {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid $list-menu-border-color;
    }

    // 最后一项没有边框间隔线
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
}
</style>
