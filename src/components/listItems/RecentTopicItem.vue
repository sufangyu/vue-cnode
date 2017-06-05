<template>
  <media-box-item
    class="recent-topic-item"
    :title="item.title"
  >
    <img
      slot="header"
      class="img-avatar lazy-img-fadein"
      src="../../assets/default-avatar.png"
      v-lazy="item.author.avatar_url"
    />

    <div class="flex flex-between" slot="meta">
      <div class="flex-between__left">
        <span @click="handleEdit" class="button__edit">编辑</span>
        <span @click="handlePreview" class="button__preview">预览</span>
        <span @click="handleDel" class="button__del" disabled>删除</span>
      </div>
      <div class="flex-between__right">
        <span>{{ item.last_reply_at }}</span>
      </div>
    </div>
  </media-box-item>
</template>

<script>
import MediaBoxItem from './MediaBoxItem';

export default {
  name: 'recent-topic-item',
  props: {
    item: {
      type: Object,
    },
    footer: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    MediaBoxItem,
  },
  methods: {
    // 主题编辑
    handleEdit() {
      this.$emit('edit');
    },
    // 主题预览
    handlePreview() {
      this.$emit('preview');
    },
    // 主题删除
    handleDel() {
      this.$emit('del');
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.recent-topic-item {
  .flex-between {
    margin-top: px2rem(10px);
  }

  .flex-between__left {
    span {
      font-size: px2rem(28px);
      cursor: pointer;

      &[disabled] {
        opacity: 0.5;
      }
    }

    .button__edit {
      color: $primary-color;
    }
  }
}
</style>
