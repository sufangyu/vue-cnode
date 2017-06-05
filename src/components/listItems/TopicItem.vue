<template>
  <div class="topic-item">
    <router-link
      :to="to"
      :tag="tag"
      :append="append"
      :replace="replace"
      :exact="exact"
    >
      <div class="topic-item__extra flex">
        <div class="topic-item__avatar">
          <img class="img-avatar lazy-img-fadein" v-lazy="item.author.avatar_url" src="../../assets/default-avatar.png" />
        </div>
        <div class="flex-1">
          <div class="topic-item__author">{{ item.author.loginname }}</div>
          <div class="topic-item__create">{{ item.last_reply_at }}</div>
        </div>
      </div>

      <div class="topic-item__title">{{ item.title }}</div>
      <div class="topic-item__summary" v-html="item.content"></div>
      <div class="topic-item__media flex flex-between">
        <div class="topic-item__media__left">
          <span>
            <Icon value="view"/>
            <em>{{ item.visit_count }}</em>
          </span>
          <span>
            <Icon value="comment"/>
            <em>{{ item.reply_count }}</em>
          </span>
        </div>
        <div class="topic-item__media__right">
          <span>
            <Icon value="create"/>
            <em>{{ item.create_at }}</em>
          </span>
        </div>
      </div>

      <span class="icon icon-top" v-show="item.top"></span>
      <span class="icon icon-good" v-show="item.good"></span>
    </router-link>
  </div>
</template>

<script>
import Icon from '@/components/icon';

export default {
  name: 'topic-item',
  props: {
    item: {
      type: Object,
    },
    to: {
      type: [String, Object],
    },
    tag: {
      type: String,
      default: 'a',
    },
    append: {
      type: Boolean,
      default: false,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.topic-item {
  margin-bottom: px2rem(30px);

  a {
    display: block;
    color: inherit;
    position: relative;
    background-color: $white;
    padding: px2rem(30px);
  }

  .icon-top,
  .icon-good {
    position: absolute;
    top: 0;
    display: block;
    width: px2rem(50px);
    height: px2rem(94px);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .icon-top {
    right: px2rem(30px);
    background-image: url("../../assets/icon-top.png");
  }
  .icon-good {
    right: px2rem(100px);
    background-image: url("../../assets/icon-good.png");
  }


  &__extra {
    margin-bottom: px2rem(40px);
    background-color: rgba(0,0,0,0);
  }
  &__avatar {
    width: px2rem(70px);
    height: px2rem(70px);
    margin-right: px2rem(20px);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__author {
    font-size: px2rem(28px);
    color: $grey800;
  }

  &__create {
    margin-top: px2rem(14px);
    font-size: px2rem(24px);
    color: $grey400;
  }

  &__title {
    font-size: px2rem(38px);
    margin-bottom: px2rem(30px);
    @include ellipsis();
  }

  &__summary {
    font-size: px2rem(30px);
    line-height: 1.2;
    margin-bottom: px2rem(50px);
    color: $grey500;
    max-height: 99999px;
    @include ellipsisMulti();
  }

  &__media {
    border-top: 1px solid $grey300;
    padding: px2rem(30px) 0 0;
    font-size: px2rem(26px);
    color: $grey400;
    max-height: 99999px;

    &__left {
      span {
        margin-right: px2rem(20px);
      }
    }

    .iconfont {
      font-size: px2rem(30px);
    }
  }

}

</style>
