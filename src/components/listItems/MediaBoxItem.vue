<template>
  <div class="media-box flex">
      <div class="media-box__header">
        <slot name="header"></slot>
      </div>
      <div class="media-box__body">
        <slot name="body">
          <div class="media-box__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="media-box__desc">
            <slot name="desc"></slot>
          </div>
          <div class="media-box__meta">
            <slot name="meta"></slot>
          </div>
        </slot>
      </div>
      <div class="media-box__footer">
        <slot name="footer">
        </slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'media-box-item',
  props: {
    item: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.media-box {
  margin-bottom: px2rem(30px);
  display: flex;
  color: inherit;
  position: relative;
  background-color: $white;
  padding: px2rem(30px);

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 0;
  }

  &__header {
    width: px2rem(86px);
    height: px2rem(86px);
    margin-right: px2rem(30px);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__footer {
    position: relative;
    right: px2rem(-10px);
    color: $grey400;
  }

  &__title {
    font-size: px2rem(32px);
    margin-bottom: px2rem(20px);
    @include ellipsisMulti(1);
  }

  &__meta {
    font-size: px2rem(26px);
    color: $grey400;
    max-height: 99999px;

    em {
      margin: 0 px2rem(2px);
    }
  }
}
</style>
