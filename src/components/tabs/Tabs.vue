<template>
  <div class="tabs">
    <slot></slot>
    <span class="tab--active" ref="active"></span>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    value: {},
  },
  data() {
    return {
      tabActiveStyle: {
        width: '100%',
        transform: 'translate3d(0, 0, 0)',
      },
    };
  },
  updated() {
    this.setTabActiveStyle();
  },
  mounted() {
    this.setTabActiveStyle();
  },
  methods: {
    // 获取当前高亮 tab 的 index
    getActiveIndex() {
      if (!this.$children || this.$children.length === 0) {
        return -1;
      }
      let activeIndex = -1;
      this.$children.forEach((tab, i) => {
        if (tab.value === this.value) {
          activeIndex = i;
        }
      });
      return activeIndex;
    },
    // 设置高亮 tab
    setTabActiveStyle() {
      const x = this.getActiveIndex() * 100;
      const len = this.$children.length;
      const ele = this.$refs.active;
      ele.style.width = len > 0 ? `${(100 / len).toFixed(4)}%` : '100%';
      ele.style.transform = `translate3d(${x}%, 0, 0)`;
    },
    tabClickHandler(value) {
      if (this.value !== value) {
        this.$emit('change', value);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.tabs {
  display: flex;
  justify-content: space-between;
  color: $white;
  background-color: $primary-color;
  text-align: center;
  position: relative;
  z-index: $zindex-message;
}

.tab--active {
  position: absolute;
  bottom: 0;
  height: px2rem(4px);
  background-color: $white;
  backface-visibility: hidden;
  transition: transform 0.3s cubic-bezier(.86,0,.07,1);
}
</style>

