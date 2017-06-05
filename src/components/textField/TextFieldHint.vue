<template>
  <div class="text-field__hint" :class="{'show': show}">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  name: 'text-field-hint',
  props: {
    // 提示内容
    text: {
      type: String,
      default: '',
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true,
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

// 提示文字
.text-field__hint {
  position: absolute;
  font-size: px2rem(28px);
  line-height: px2rem(62px);
  opacity: 0;
  transition: opacity .45s cubic-bezier(.23, 1, .32, 1);
  color: $text-field-color-hint;

  &.show {
    opacity: 1;
  }
}
</style>
