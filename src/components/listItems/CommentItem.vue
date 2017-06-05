<template>
  <div class="comment">
    <div class="comment__avatar">
      <img class="img-avatar lazy-img-fadein" v-lazy="item.author.avatar_url" src="../../assets/default-avatar.png" />
    </div>
    <div class="comment__info">
      <div class="comment__media">
        <div class="comment__media__left">
          <div class="comment__username">{{ item.author.loginname }}</div>
          <div class="comment__date">{{ item.create_at }}</div>
        </div>
        <div class="comment__media__right">
          <div class="comment__actions">
            <span @click="replyHandler(item.id, item.author.loginname, $event)"><icon value="reply" size="xs"/></span>
            <span
              @click="praiseHandler(item.id, $event)"
              :class="{ 'praised': item.is_uped }"
            >
              <icon value="praise" size="xs"/>
              <em>{{ item.praise }}</em>
            </span>
          </div>
        </div>
      </div>
      <div class="comment__content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon';

export default {
  name: 'comment',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    Icon,
  },
  methods: {
    praiseHandler(id) {
      this.$emit('praise', id, event);
    },
    replyHandler(id, name) {
      this.$emit('reply', id, name, event);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.comment {
  display: flex;
  padding-top: px2rem(40px);

  &:last-child {
    .comment__info {
      border-bottom: none;
    }
  }

  &__avatar {
    width: px2rem(60px);
    height: px2rem(60px);
    margin-right: px2rem(20px);

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.1);
    }
  }

  &__info {
    flex: 1;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: px2rem(40px);
    min-width: 0;
  }


  &__media {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0);
  }

  &__actions {
    font-size: 0;
    vertical-align: middle;

    .iconfont {
      font-size: px2rem(30px);
      margin-right: px2rem(10px);
    }

    span {
      font-size: px2rem(28px);
      margin-left: px2rem(30px);
      opacity: 0.6;
      cursor: pointer;

      &.praised {
       color: $primary-color;
        opacity: 1;
      }

      em {
        vertical-align: middle;
      }
    }
  }

  &__username {
    font-size: px2rem(28px);
    margin-bottom: px2rem(12px);
  }

  &__date {
    font-size: px2rem(22px);
    opacity: 0.5;
  }

  &__content {
    margin-top: px2rem(30px);
    font-size: px2rem(30px);
    line-height: 1.4;
    text-align: justify;
    max-height: 9999px;
    word-wrap:break-word;

    p {
      margin-bottom: px2rem(20px);
      word-wrap:break-word;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
