<template>
  <div class="panel-simple"
    :class="{ 'panel-simple--inside': inside, 'panel-simple--blank': wingBlank, 'panel-simple--space': whiteSpace, 'panel-simple--top--no': noDistanceTop, 'panel-simple--bottom--no': noDistanceBottom }"
  >
    <div class="panel-simple__header" v-if="title">{{title}}</div>
    <div class="panel-simple__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 面板
export default {
  name: 'panel-simple',
  props: {
    // 没有顶部间距
    noDistanceTop: {
      type: Boolean,
      default: false,
    },
    // 没有底部间距
    noDistanceBottom: {
      type: Boolean,
      default: false,
    },
    // 标题是否在内部
    inside: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 左右留白
    wingBlank: {
      type: Boolean,
      default: false,
    },
    // 上下留白
    whiteSpace: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.panel-simple {
  margin: $space-blank-sm 0;

  // 没有顶部间距
  &--top--no {
    margin-top: 0;
  }
  // 没有底部间距
  &--bottom--no {
    margin-bottom: 0;
  }

  // 两边留白
  &.panel-simple--blank {
    .panel-simple__body {
      padding-left: $space-blank-base;
      padding-right: $space-blank-base;
    }
  }

  // 上下留白
  &.panel-simple--space {
    .panel-simple__body {
      padding-top: $space-blank-base;
      padding-bottom: $space-blank-base;
    }
  }

  // 标题在内部
  &.panel-simple--inside {
    .panel-simple__header {
      background-color: $panel-simple-background-color;
      overflow: hidden;
      padding-top: $space-blank-base;
    }
  }

  .panel-simple__header {
    color: $panel-simple-text-color-header;
    font-size: px2rem(24px);
    padding-bottom: $space-blank-sm;
    padding-left: $space-blank-base;
    padding-right: $space-blank-base;
    max-height: 9999px;
  }

  .panel-simple__body {
    background-color: $panel-simple-background-color;
  }
}
</style>
