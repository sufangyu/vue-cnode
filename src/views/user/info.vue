<template>
  <div class="page page-info">
    <nav-bar title="个人资料" fixed/>

    <div class="page-info__content">
      <panel-simple>
        <list-menu full-line>
          <list-menu-item title="头像" :hasArrow="false">
            <div class="user-info__detail user-avatar" slot="extra">
              <img class="img-avatar  lazy-img-fadein" v-lazy="userInfoDetail.avatar" src="../../assets/default-avatar.png" />
            </div>
          </list-menu-item>
          <list-menu-item title="昵称" :hasArrow="false">
            <div class="user-info__detail" slot="extra">{{ userInfoDetail.name }}</div>
          </list-menu-item>
          <list-menu-item title="积分" :hasArrow="false">
            <div class="user-info__detail" slot="extra">{{ userInfoDetail.score }}</div>
          </list-menu-item>
          <list-menu-item title="注册时间" :hasArrow="false">
            <div class="user-info__detail" slot="extra">{{ userInfoDetail.createDate }}</div>
          </list-menu-item>
          <list-menu-item title="邮箱" :hasArrow="false">
            <div class="user-info__detail" slot="extra">{{ userInfoDetail.email }}</div>
          </list-menu-item>
          <list-menu-item title="GitHub" :href="userInfoDetail.github" target="_blank">
          </list-menu-item>
        </list-menu>
      </panel-simple>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar';
import { PanelSimple } from '@/components/panel';
import { ListMenu, ListMenuItem } from '@/components/lists';
import Toast from '@/components/toast/toast';

import moment from 'moment';
import { mapGetters } from 'vuex';
import request from '@/api/request';
import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';

export default {
  name: 'user-info',
  mixins: [auth, unlogin],
  data() {
    return {
      // 用户详细信息
      userInfoDetail: {
        avatar: '',
        name: '',
        score: '',
        createDate: '',
        email: '',
        github: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    userName() {
      return this.$route.params.name;
    },
  },
  components: {
    NavBar, PanelSimple, ListMenu, ListMenuItem, Toast,
  },
  created() {
    if (!this.userName) {
      // 获取当前登录用户资料
      if (this.auth && this.auth.token && this.auth.loginName) {
        this.getUserInfo(this.auth.loginName);
      } else {
        // 未登录, 重定向到到登录页
        this.redirectToLogin();
      }
    } else {
      // 获取指定用户资料
      this.getUserInfo(this.userName);
    }
  },
  methods: {
    // 获取用户资料
    getUserInfo(loginname) {
      request.getUserInfo(loginname, (res) => {
        console.log(res);
        if (res.success) {
          const userInfo = res.data;
          this.userInfoDetail = {
            avatar: userInfo.avatar_url,
            name: userInfo.loginname,
            score: userInfo.score,
            createDate: moment(userInfo.create_at).format('YYYY-MM-DD'),
            email: `${userInfo.githubUsername}@github.com`,
            github: `https://github.com/${userInfo.githubUsername}`,
          };
        } else {
          const failMsg = res.error_msg || '获取失败，请返回重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        console.log(err);
        const errorMsg = err.error_msg || '获取失败，请返回重试';
        Toast({
          content: errorMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.page-info {
  &__content {
    .user-avatar {
      img {
        width: px2rem(75px);
        height: px2rem(75px);
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .user-info__detail {
      font-size: px2rem(30px);
    }
  }
}
</style>
