<template>
  <div class="grids" :class="className">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 九宫格外层容器
 * grids--line: 间隔边框线.  eg: <grids class="grids--line"></grids>
 */
export default {
  name: 'grids',
  props: {
    // 自定义 class
    className: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.grids {
  display: flex;
}

// 边框
.grids--line {
  border-bottom: 1px solid $border-color-base;

  &:last-child {
    border-bottom: none;
  }

  .grid__item {
    border-right: 1px solid $border-color-base;

    &:last-child {
      border-right: none;
    }
  }
}
</style>
