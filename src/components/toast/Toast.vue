<template>
  <div class="toast" :class="className" :data-type="icon">
    <transition name="overlay-fade">
      <div class="toast__overlay" v-show="visible && overlay" :style="{ backgroundColor: overlayBackground, opacity: overlayOpacity }" @touchmove.prevent></div>
    </transition>

    <transition name="toast">
      <div class="toast__content" ref="toastContent" v-show="visible" :class="positionClass" @touchmove.prevent>
        <i class="toast__icon" :class="iconClass" v-if="iconClass !== ''"></i>
        <div class="toast__text" v-html="content"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    content: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'bottom',
    },
    className: {
      type: String,
      default: '',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    overlayOpacity: {
      type: Number,
      default: 0,
    },
    overlayBackground: {
      type: String,
      default: '#000',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    // icon className
    iconClass() {
      let classes = '';
      switch (this.icon) {
        case 'success':
          classes = 'iconfont icon-success';
          break;
        case 'fail':
          classes = 'iconfont icon-fail';
          break;
        case 'offline':
          classes = 'iconfont icon-offline';
          break;
        case 'loading':
          classes = 'iconfont icon-loading animate-loading';
          break;
        default:
          classes = '';
      }
      return classes;
    },
    // 位置
    positionClass() {
      const classes = [];
      switch (this.position) {
        case 'middle':
          classes.push('toast__middle');
          break;
        default:
          classes.push('toast__bottom');
      }
      classes.push(this.className);
      return classes.join(' ');
    },
  },
};
</script>


<style lang="scss">
@import "../../style/import";

.toast {
  &__overlay {
    height: 100%;
    background-color: #000;
    opacity: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  &__content {
    position: fixed;
    max-width: 80%;
    padding: px2rem(28px) px2rem(42px);
    border-radius: px2rem(12px);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    z-index: 1000;
  }

  &[data-type="success"],
  &[data-type="fail"],
  &[data-type="offline"],
  &[data-type="loading"] {
    .toast__content {
      border-radius: px2rem(20px);
      min-width: px2rem(224px);
      min-height: px2rem(224px);
    }
  }

  &__middle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &__bottom {
    left: 50%;
    bottom: px2rem(60px);
    transform: translate(-50%, 0);
  }

  &__icon {
    display: block;
    text-align: center;
    font-size: px2rem(90px);
    width: px2rem(98px);
    height: px2rem(98px);
    margin: px2rem(2px) auto px2rem(28px);

    &.animate-loading {
      width: px2rem(82px);
      height: px2rem(82px);
      margin: px2rem(8px) auto px2rem(38px);
      display: inline-block;
      vertical-align: middle;
      border: px2rem(4px) solid #fff;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: loading 0.8s infinite linear;
    }
  }

  &__text {
    font-size: px2rem(28px);
    display: block;
    text-align: center;
    line-height: 1;
    padding: px2rem(6px) 0;
  }
}

.toast-enter,
.toast-enter-active,
.toast-leave,
.toast-leave-active {
  transition: all .15s linear;
}
.toast-enter-active,
.toast-leave {
  opacity: 1;
}
.toast-enter,
.toast-leave-active {
  opacity: 0;
}

.toast__bottom.toast-enter-active {
  animation: slideToast .8s 1 linear;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity .2s cubic-bezier(0.23, 1, 0.32, 1);
}
.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0 !important;
}

@keyframes slideToast {
   0% { bottom: 0; opacity: 0; }
  20% { bottom: px2rem(80px); opacity: 1; }
  40% { bottom: px2rem(60px); opacity: 1; }
  100% { bottom: px2rem(60px); opacity: 1; }
}

@keyframes loading {
    0% { transform: rotate3d(0, 0, 1, 0deg); }
  100% { transform: rotate3d(0, 0, 1, 360deg); }
}
</style>
