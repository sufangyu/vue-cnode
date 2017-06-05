<template>
  <div class="button-group" :class="[ alignClass, sizeClass, buttonGroupInternalClass ]">
    <slot></slot>
  </div>
</template>

<script>
/**
 * @TODO: 1. 对齐方式 和 间距分离;   2. 无间距
 */

export default {
  name: 'button-group',
  props: {
    // 对齐方向
    align: {
      type: String,
      default: 'left',  // left: 左对齐;  center: 居中;  right: 右对齐
    },
    // 合并边框 separate 默认值 边框会被分开。border-spacing; collapse
    collapse: {
      type: Boolean,
      default: false,
    },
    // 排列方向
    direction: {
      type: String,
      default: 'row',  // row: 水平方向;  column: 垂直方向
    },
    // 尺寸
    size: {
      type: String,
      default: 'md',   // sm, md, lg
    },
  },
  computed: {
    alignClass() {
      return this.align !== 'left' ? `button-group--align-${this.align}` : '';
    },
    sizeClass() {
      return this.align !== 'md' ? `button-group--size-${this.size}` : '';
    },
    buttonGroupInternalClass() {
      return {
        'button-group--collapse': this.collapse,
      };
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.button-group {
  font-size: 0;

  // 左对齐
  .button {
    margin-right: px2rem(20px);

    &:last-child {
      margin-right: 0;
    }
  }


  &--align {
    // 居中对齐
    &-center {
      text-align: center;
      .button {
        margin-left: px2rem(10px);
        margin-right: px2rem(10px);
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }

    // 右对齐
    &-right {
      text-align: right;
      .button {
        margin-left: px2rem(20px);

        &:first-child {
          margin-right: 0;
          margin-left: 0;
        }
      }
    }
  }

  // 无边距
  &--collapse {
    .button {
      margin-left: 0;
      margin-right: 0;
    }
  }

  // 尺寸
  &--size {
    &-sm {
      .button {
        height: $button-size-sm;
        line-height: $button-size-sm;
        padding: 0 px2rem(25px);

        .button__icon {
          font-size: px2rem(28px);

          + .button__label {
            margin-left: px2rem(6px);
          }
        }

        .button__label {
          font-size: px2rem(24px);

          + .button__icon {
            margin-right: px2rem(6px);
          }
        }
      }
    }

    &-lg {
      .button {
        height: $button-size-lg;
        line-height: $button-size-lg;
        padding: 0 px2rem(45px);

        .button__icon {
          font-size: px2rem(40px);
        }

        .button__label {
          font-size: px2rem(36px);
        }
      }
    }
  }

}
</style>
