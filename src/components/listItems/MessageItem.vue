<template>
  <div class="message" @click="clickHandler">
    <div class="message__avatar">
      <img class="img-avatar lazy-img-fadein" v-lazy="item.author.avatar_url" src="../../assets/default-avatar.png" />
    </div>
    <div class="message__info">
      <div class="message__title">TO: {{ item.topic.title }}</div>
      <div class="message__content">{{ item.reply.content }}</div>
      <div class="message__media">
        <div class="message__media__left">
        </div>
        <div class="message__media__right">
          <span class="message__username">{{ item.author.loginname }}</span>
          <span class="sep"> - </span>
          <span class="message__date">{{ item.create_at }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'topic-item',
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    clickHandler(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.message {
  position: relative;
  background-color: #fff;
  padding: px2rem(25px) px2rem(25px) 0;
  margin-bottom: px2rem(20px);
  margin-left: px2rem(100px);

  &:before {
    content: " ";
    position: absolute;
    left: px2rem(-72px);
    top: px2rem(50px);
    bottom: px2rem(-80px);
    z-index: 1;
    display: block;
    width: px2rem(4px);
    background: $grey300;
  }

  &:last-child {
    &:before {
      display: none;
    }
  }

  &__avatar {
    width: px2rem(60px);
    height: px2rem(60px);
    position: absolute;
    z-index: 11;
    left: px2rem(-100px);
    top: px2rem(25px);

    img {
      position: relative;
      z-index: 11;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
      background-color: $grey200;
    }
  }

  &__info {
    flex: 1;
    position: relative;

    &:after {
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      top: px2rem(10px);
      left: px2rem(-65px);
      pointer-events: none;
      border: solid transparent;
      border-right-color: #fff;
      border-width: px2rem(20px);

    }
  }


  &__media {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0);
    padding: px2rem(25px) 0;
    font-size: px2rem(24px);
    border-top: 1px solid #e5e5e5;

    &__right {
      opacity: 0.6;
    }

    .sep {
      margin: 0 px2rem(14px);
    }
  }

  &__title {
    font-size: px2rem(28px);
    opacity: 0.8;
    max-height: 9999px;
    @include ellipsis();
  }

  &__content {
    margin: px2rem(30px) 0 px2rem(40px);
    font-size: px2rem(30px);
    line-height: 1.4;
    text-align: justify;
    max-height: 9999px;
    word-break: break-all;
  }
}
</style>
