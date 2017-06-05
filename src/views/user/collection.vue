<template>
  <div class="page page-collection">
    <nav-bar fixed title="我的收藏" />

    <div class="collection-list">

      <!-- 初始加载中 -->
      <module-state
        v-if="moduleLoadState === 0"
        slot="spinner"
        state="0"
        type="line"
        size="sm"
      />
      <!-- 初始加载失败 -->
      <module-state
        v-if="moduleLoadState === -1"
        state="-1"
        @failClick="failClickHandler"
      />

      <!-- 没有结果 -->
      <module-state
        v-if="moduleLoadState === 1"
        state="1"
        emptyText="暂时没有收藏内容 ~~"
        emptyActionText="去首页看看"
        @emptyActionClick="toTopic"
      />

      <topic-item
        v-for="(item, index) in collections"
        :to="{ path: '/detail/'+item.id }"
        :item="item"
        :key="index"
        append
      />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar';
import ModuleState from '@/components/states';
import { TopicItem } from '@/components/listItems';

import moment from 'moment';
import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';
import request from '@/api/request';

moment.locale('zh-cn');

export default {
  name: 'user-collection',
  mixins: [auth, unlogin],
  data() {
    return {
      moduleLoadState: 0,     // 模块初始化加载状态
      collections: [],
    };
  },
  components: {
    NavBar, ModuleState, TopicItem,
  },
  created() {
    if (this.auth && this.auth.token && this.auth.loginName) {
      this.getCollections(this.auth.loginName);
    } else {
      // 未登录, 重定向到到登录页
      this.redirectToLogin();
    }
  },
  mounted() {
    this.$store.dispatch('hideTabBar');
  },
  destroyed() {
    this.$store.dispatch('showTabBar');
  },
  methods: {
    // 加载失败
    failClickHandler() {
      this.moduleLoadState = 0;
      this.getCollections();
    },
    // 获取用户收藏
    getCollections(userName) {
      console.log('获取用户收藏', userName);
      request.getCollections(userName, (res) => {
        console.log(res);
        // 初始化加载成功
        this.moduleLoadState = 2;
        if (res.success) {
          if (res.data.length) {
            // 格式化发布事件 与 最新回复时间
            res.data.forEach((item) => {
              item.last_reply_at = moment(item.last_reply_at).fromNow();
              item.create_at = moment(item.create_at).format('YYYY-MM-DD hh:MM:ss');
              item.content = item.content.replace(/\r/ig, '').replace(/\n/ig, '').replace(/#/ig, '').substring(0, 150);
            });

            this.collections = res.data;
          } else {
            // 内容为空
            this.moduleLoadState = 1;
          }
        }
      }, (err) => {
        console.log(err);
        // 初始化加载失败
        this.moduleLoadState = -1;
      });
    },
    // 去主题列表页
    toTopic() {
      const to = {
        path: '/',
      };
      this.$router.replace(to);
    },
  },
};
</script>
