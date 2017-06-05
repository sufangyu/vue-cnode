<template>
  <div class="popup">
    <transition name="overlay-fade" @after-enter="show()" @after-leave="hide()">
      <div class="popup__overlay" v-if="open" @click.stop="hideByOverlay" @touchmove.prevent></div>
    </transition>

    <transition name="popup" @after-enter="show()" @after-leave="hide()">
      <div class="popup__content" v-if="open">
        <div class="popup__close" @click="hide" v-if="closeShow">
          <icon value="close" size="xxs"/>
        </div>
        <div class="popup__header" v-if="headerShow">
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="popup__body">
          <slot></slot>
        </div>
        <div class="popup__footer" @click="hide" v-if="footerShow">
          <slot name="footer">{{ footer }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '@/components/icon';

export default {
  name: 'popup-bottom',
  props: {
    // 点击遮罩层是否关闭弹窗
    clickOverlay: {
      type: Boolean,
      default: false,
    },
    // 是否显示关闭
    closeShow: {
      type: Boolean,
      default: false,
    },
    // 底部文案
    footer: {
      type: String,
      default: '取消',
    },
    // 是否显示取消
    footerShow: {
      type: Boolean,
      default: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    headerShow: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
  },
  methods: {
    show() {
      this.$emit('show');
    },
    hide() {
      this.$emit('hide');
    },
    hideByOverlay() {
      if (this.clickOverlay) {
        this.$emit('hide');
      }
    },
  },
};
</script>


<style lang="scss">
@import "../../style/import";

.popup {
  &__overlay, &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $zindex-popover;
  }

  &__overlay {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__header {
    padding: px2rem(30px) px2rem(20px);
    color: #888;
    text-align: center;
    font-size: px2rem(32px);
    border-bottom: 1px solid $grey200;
  }

  &__close {
    position: absolute;
    top: px2rem(24px);
    right: px2rem(24px);
  }

  &__footer {
    padding: px2rem(20px);
    color: #000;
    background-color: $white;
    text-align: center;
    font-size: px2rem(36px);
    border-top: 1px solid $grey300;
  }

  &__body {
    /*overflow-y: scroll;*/
  }

  &__content {
    top: auto;
    background-color: $grey50;
  }
}
// 动画
.popup {
  &-enter-active,
  &-leave-active {
    transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1);
    backface-visibility: hidden;
  }
  &-enter,
  &-leave-active {
    transform: translate3d(0, 100%, 0);
  }
}
.overlay-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
    &-enter,
    &-leave-active {
    opacity: 0 !important;
  }
}
</style>
