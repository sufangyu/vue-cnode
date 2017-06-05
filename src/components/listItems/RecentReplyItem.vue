<template>
  <media-box-item
    class="recent-reply-item"
    :title="item.title"
    @click.native="handlePreview"
  >
    <img
      slot="header"
      class="img-avatar lazy-img-fadein"
      src="../../assets/default-avatar.png"
      v-lazy="item.author.avatar_url"
    />

    <div class="flex flex-between" slot="meta">
      <div class="flex-between__left">
        {{ item.author.loginname }}
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
  name: 'recent-reply-item',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    MediaBoxItem,
  },
  methods: {
    // 主题预览
    handlePreview() {
      this.$emit('preview');
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.recent-reply-item {
  cursor: pointer;
}
</style>
