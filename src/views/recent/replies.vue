<template>
  <div class="page page-recent">
    <nav-bar fixed title="最近回复">
    </nav-bar>

    <div class="recent-list">

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
        emptyText="暂时没有最近回复内容 ~~"
      />

      <recent-reply-item
        v-for="(item, index) in recentReplies"
        :item="item"
        :key="index"
        @preview="topicPreview(item.id)"
      />
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navbar';
  import ModuleState from '@/components/states';
  import { RecentReplyItem } from '@/components/listItems';

  import moment from 'moment';
  import auth from '@/mixins/auth';
  import unlogin from '@/mixins/unlogin';
  import request from '@/api/request';

  moment.locale('zh-cn');

  export default {
    name: 'recent-replies',
    mixins: [auth, unlogin],
    data() {
      return {
        moduleLoadState: 0,     // 模块初始化加载状态
        recentReplies: [],
      };
    },
    components: {
      NavBar, ModuleState, RecentReplyItem,
    },
    created() {
      if (this.auth && this.auth.token && this.auth.loginName) {
        this.getRecentReplies(this.auth.loginName);
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
        this.getRecentReplies();
      },
      // 获取用户最近回复
      getRecentReplies(userName) {
        this.moduleLoadState = 0;
        console.log('获取用户最近回复', userName);
        request.getRecentReplies(userName, (res) => {
          console.log(res);
          // 初始化加载成功
          this.moduleLoadState = 2;
          if (res.success) {
            const recentReplies = res.data.recent_replies;
            if (recentReplies.length) {
              // 格式化发布事件 与 最新回复时间
              recentReplies.forEach((item) => {
                item.last_reply_at = moment(item.last_reply_at).fromNow();
              });

              this.recentReplies = recentReplies;
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
      // 主题预览
      topicPreview(id) {
        const topicPreviewUrl = `/detail/${id}`;
        const to = {
          path: topicPreviewUrl,
        };
        this.$router.push(to);
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
