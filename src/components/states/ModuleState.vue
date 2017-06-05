<template>
  <div class="state"
    v-if="!hide"
    :class="[ typeClass, sizeClass ]"
  >
    <!-- 加载中 -->
    <div
      class="state__content state__content-loading"
      v-if="state === '0'"
    >
      <slot name="loading">
        <div
          class="state__image"
          v-if="loadingImage"
        >
          <img :src="loadingImage" />
        </div>
        <div class="state__text">{{ loadingText }}</div>
      </slot>
    </div>

    <!-- 空内容 -->
    <div
      class="state__content state__content-empty"
      v-if="state === '1'"
    >
      <slot name="empty">
        <div
          class="state__image"
          v-if="emptyImage"
        >
          <img :src="emptyImage" />
        </div>
        <div class="state__text">{{ emptyText }}</div>
        <div class="state__actions"
          v-if="emptyActionText"
          @click="emptyActionClickHandler"
        >
          <slot name="emptyAction">
            <yu-button :label="emptyActionText" type="flat" primary/>
          </slot>
        </div>
      </slot>
    </div>

    <!-- 失败 -->
    <div
      class="state__content state__content-fail"
      v-if="state === '-1'"
      @click="failClickHandler"
    >
      <slot name="fail">
        <div
          class="state__image"
          v-if="failImage"
        >
          <img :src="failImage" />
        </div>
        <div class="state__text">{{ failText }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components/buttons';

import loading from './images/loading.svg';
import fail from './images/fail.svg';
import empty from './images/empty.svg';

export default {
  name: 'module-state',
  props: {
    // 空内容示意图
    emptyImage: {
      type: String,
      default: empty,
    },
    // 空内容提示文字
    emptyText: {
      type: String,
      default: '暂时没有相关内容 ~~',
    },
    // 空内容行为按钮提示文字
    emptyActionText: {
      type: String,
    },
    // 失败示意图
    failImage: {
      type: String,
      default: fail,
    },
    // 失败提示文字
    failText: {
      type: String,
      default: '获取数据失败，点击重试 ~~',
    },
    // 是否隐藏模块状态
    hide: {
      type: Boolean,
      default: false,
    },
    // 加载中示意图
    loadingImage: {
      type: String,
      default: loading,
    },
    // 加载中提示文字
    loadingText: {
      type: String,
      default: '正在加载，请稍等 ~~',
    },
    // 模块状态
    state: {
      type: String,
      default: '0', // 0: 加载中;  1: 空内容;  2: 有内容;  -1: 失败
    },
    // 尺寸
    size: {
      type: String,
      default: 'md',
    },
    // 样式
    type: {
      type: String,
      default: 'middle', // middle: 水平和垂直居中;  line: 水平居中
    },
  },
  computed: {
    // 样式
    typeClass() {
      return `state--style-${this.type}`;
    },
    // 图片尺寸
    sizeClass() {
      return `state--size-${this.size}`;
    },
  },
  components: {
    'yu-button': Button,
  },
  methods: {
    emptyActionClickHandler() {
      this.$emit('emptyActionClick');
    },
    failClickHandler() {
      this.$emit('failClick');
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import.scss";

.state {
  text-align: center;
  padding-top: px2rem(20px);
  padding-bottom: px2rem(20px);

  &__image {
    opacity: 0.5;
    font-size: 0;

    + .state__text {
      margin-top: px2rem(30px);
    }
  }

  &__text {
    opacity: 0.5;

    + .state__actions {
      margin-top: px2rem(60px);
    }

  }

  &--style {
    // 水平垂直居中
    &-middle {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;

      .state__content {
        max-width: 90%;
        margin: 0 auto;
      }
    }

    // 含内
    &-line {
      padding-top: px2rem(40px);
      padding-bottom: px2rem(40px);
    }
  }

  // 尺寸
  &--size {
    &-sm {
      .state__image {
        img {
          max-width: px2rem(80px);
          max-height: px2rem(80px);
        }
      }
      .state__text {
        font-size: px2rem(28px);
      }
    }
    &-md {
      .state__image {
        img {
          max-width: px2rem(160px);
          max-height: px2rem(160px);
        }
      }
      .state__text {
        font-size: px2rem(32px);
      }
    }
    &-lg {
      .state__image {
        img {
          max-width: px2rem(320px);
          max-height: px2rem(320px);
        }
      }
      .state__text {
        font-size: px2rem(36px);
      }
    }
  }
}

</style>
