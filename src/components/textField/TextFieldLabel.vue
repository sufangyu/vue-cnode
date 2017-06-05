<template>
  <div class="text-field__label" :class="labelClassName">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  name: 'text-field-label',
  props: {
    // 是否浮动
    float: {
      type: Boolean,
      default: false,
    },
    // 是否获取焦点
    focus: {
      type: Boolean,
      default: false,
    },
    // 标签文字
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    labelClassName() {
      const className = [];
      // 浮动类型标签, 添加浮动标识
      if (this.float) {
        className.push('label--float');
      }
      return className.concat('');
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 标签
.text-field__label {
  position: absolute;
  top: px2rem(50px);
  color: inherit;
  font-size: $text-field-font-size-label;
  transform-origin: left top;
  transition: all .45s cubic-bezier(0.23,1,0.32,1);

  &.label--float {
    font-size: $text-field-font-size-label-float;
    top: px2rem(0px);
  }
}
</style>
