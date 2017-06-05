<template>
  <div class="tab__link"
    :disabled="disabled"
    :class="{ 'active': active }"
    @click="tabClickHandler"
  >
    <div class="tab__text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    title: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {},
  },
  computed: {
    active() {
      return this.value && this.$parent.value === this.value;
    },
  },
  watch: {
    active(val, oldVal) {
      if (val === oldVal) {
        return false;
      }
      if (val) {
        // 触发 'active' 自定义事件
        this.$emit('active', this.value, event);
      }
      return true;
    },
  },
  methods: {
    tabClickHandler(event) {
      if (this.$parent.tabClickHandler) {
        this.$parent.tabClickHandler(this.value, this);
      }
      this.$emit('click', this.value, event);
    },
  },
};
</script>


<style lang="scss">
  @import "../../style/import";

  .tab {
    &__link {
      flex: 1;
      text-align: center;
      height: px2rem(100px);
      line-height: px2rem(100px);
      font-size: px2rem(32px);
      color: rgba($white, 0.7);
      cursor: pointer;

      &.active {
        color: $white;
        transition: color 0.2s linear;
      }
    }
  }
</style>

