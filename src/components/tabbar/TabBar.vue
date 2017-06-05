<template>
    <div class="tab-bar" :class="{ 'tab-bar--hidden': hidden}">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'tab-bar',
  props: {
    // 当前的值
    value: {
      type: String,
      default: '',
    },
    // 是否隐藏
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleItemClick(value) {
      // 监听子组件的点击事件, 接收子组件传递过来当前点击项的 value;
      // 如果传递过来的 value 与旧的值不相等, 则触发父组件的的 change 事件, 并且传递子组件的 value 值;
      // 注意: 不能直接在这里直接赋值 this.value = value;
      if (value !== this.value) {
        this.$emit('change', value);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.tab-bar {
  height: $tab-bar-height;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: $tab-bar-background-color;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: $zindex-bar;
  transition: bottom .2s, opacity .2s;

  &.tab-bar--hidden {
    opacity: 0;
    bottom: $tab-bar-height-hidden;
  }
}
</style>
