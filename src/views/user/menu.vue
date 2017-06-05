<template>
  <div class="page page-user">
    <div class="user-header" v-if="!isLogged">
      <router-link :to="{ path: '/login' }">
        <div class="user-avatar">
          <img src="../../assets/default-avatar.png" alt="" />
        </div>
        <div class="user-name">登录 / 注册</div>
      </router-link>
    </div>

    <div class="user-header" v-if="isLogged">
        <div class="user-avatar">
          <img class="img-avatar lazy-img-fadein" v-lazy="userInfo.avatarUrl" src="../../assets/default-avatar.png" />
        </div>
        <div class="user-name">{{userInfo.loginName}}</div>
    </div>

    <panel-simple>
      <grids class="common-operate">
        <grid-item class="grid__item--line"
          title="发表主题"
          iconName="write"
          iconColor="cyan"
          :to="{ path: '/create' }"
        />
        <grid-item class="grid__item--line"
          title="最近回复"
          iconName="comment"
          iconColor="blue"
          :to="{ path: 'recentreplies' }"
        />
        <grid-item class="grid__item--line"
          title="最新发布"
          iconName="send"
          iconColor="orange"
          :to="{ path: 'recenttopics' }"
        />
      </grids>
    </panel-simple>

    <panel-simple>
      <list-menu line>
        <list-menu-item
          title="我的收藏"
          iconName="collection-fill"
          iconColor="lime"
          :to="{ path: 'collection' }"
        >
          <div slot="extra">
            <badge dot></badge>
          </div>
        </list-menu-item>
        <list-menu-item
          title="个人资料"
          iconName="info-fill"
          iconColor="lime"
          :to="{ path: 'me' }"
        ></list-menu-item>
        <list-menu-item
          title="意见反馈"
          brief="去 GitHub 上提交 Issues"
          href="https://github.com/sufangyu/vue-cnode/issues"
          target="_blank"
          iconName="comment-fill"
          iconColor="lime"
        ></list-menu-item>
        <list-menu-item
          title="设置"
          iconName="set-fill"
          iconColor="lime"
          :to="{ path: 'set' }"
        ></list-menu-item>
      </list-menu>
    </panel-simple>

    <panel-simple>
      <list-menu line>
        <list-menu-item
          title="关于项目"
          iconName="about-fill"
          iconColor="deepOrange400"
          :to="{ path: 'about' }"
        ></list-menu-item>
      </list-menu>
    </panel-simple>
  </div>
</template>

<script>
import { PanelSimple } from '@/components/panel';
import Badge from '@/components/badge';
import Icon from '@/components/icon';
import { Grids, GridItem } from '@/components/grids';
import { ListMenu, ListMenuItem } from '@/components/lists';

import { mapGetters } from 'vuex';
import message from '@/mixins/message';
import auth from '@/mixins/auth';
import request from '@/api/request';

export default {
  name: 'user-menu',
  mixins: [auth, message],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  components: {
    PanelSimple, Badge, Icon, Grids, GridItem, ListMenu, ListMenuItem,
  },
  created() {
    // 未登录并且有 token 时
    if (!this.isLogged && this.auth && this.auth.token) {
      this.getUserInfoSimple(this.requestAccessToken);
    }
  },
  methods: {
    // 获取简要的用户信息
    getUserInfoSimple(requestAccessToken) {
      const currentAccessToken = requestAccessToken.accesstoken;
      if (currentAccessToken && currentAccessToken !== 'undefined') {
        request.getUserInfoSimple(this.requestAccessToken, (res) => {
          if (res.success) {
            // 存储用户信息
            this.$store.dispatch('setAuth', {
              type: 1,
              token: this.auth.token,
              loginName: res.loginname,
            });
            // 设置用户信息
            this.$store.dispatch('setUserInfo', {
              id: res.id,
              avatarUrl: res.avatar_url,
              loginName: res.loginname,
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 会员
.user-header {
  padding: px2rem(80px) px2rem(40px);
  text-align: center;
  color: $primary-section-text-color-base;
  background-color: $primary-section-background-color;

  a {
    display: block;
    color: $primary-section-text-color-base;
  }

  .user-avatar {
    width: px2rem(150px);
    height: px2rem(150px);
    margin: 0 auto;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .user-name {
    margin-top: px2rem(30px);
  }
}

// 常用操作
.common-operate {
  .grid__icon {
    &.cyan {
      color: #1ca78e;
    }
    &.blue-light {
      color: #8fa2ef;
    }
    &.orange {
      color: #ff6600;
    }
  }
}
</style>
