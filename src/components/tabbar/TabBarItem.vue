<template>
    <div class="tab-bar__item" :class="{ 'active': isActive, }" @click="onClick()">
      <div class="item__icon">
        <slot>
          <icon v-if="iconName" :value="iconName" size="xs"/>
        </slot>
      </div>
      <div class="item__text">{{title}}</div>
    </div>
</template>

<script>
import Icon from '@/components/icon';

export default {
  name: 'tab-bar-item',
  props: {
    // 是否高亮
    active: {
      type: Boolean,
      default: false,
    },
    // 第三方的网址
    href: {
      type: String,
      default: '',
    },
    // 图标名称
    iconName: {
      type: String,
      default: '',
    },
    // 标题名称
    title: {
      type: String,
      default: '',
    },
    // 站内路由
    to: {
      type: [String, Object],
      default: '',
    },
    // 值
    value: {
      type: null,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    // 是否高亮
    isActive() {
      return this.value === this.$parent.value || this.active;
    },
  },
  components: {
    Icon,
  },
  methods: {
    onClick() {
      // 触发父组件的 handleItemClick 事件,
      // 并传递当前点击项的 value 值. 用于判断高亮项的依据;
      this.$parent.handleItemClick(this.value);

      // 触发自身点击事件应该执行的调整
      if (this.to) {
        // 跳转路由
        this.$router.push(this.to);
      } else if (this.href) {
        // 打开网址
        window.location.href = this.href;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.tab-bar__item {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: $tab-bar-text-color;
  cursor: pointer;
  transition: color .1s;

  // 高亮当前
  &.active {
    color: $tab-bar-color-active;
  }

  .item__icon {
    font-size: px2rem(50px);
    margin-bottom: px2rem(10px);
  }
  .item__text {
    font-size: $tab-bar-font-size;
  }
}
</style>
