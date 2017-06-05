<template>
  <div class="page page-recent">
    <nav-bar fixed title="最近发布">
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
        emptyText="暂时没有最近发布内容 ~~"
      />

      <recent-topic-item
        v-for="(item, index) in recentTopics"
        :item="item"
        :key="index"
        @edit="topicEdit(item.id)"
        @preview="topicPreview(item.id)"
        @del="topicDel(item.id)"
      />
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navbar';
  import ModuleState from '@/components/states';
  import { RecentTopicItem } from '@/components/listItems';
  import Toast from '@/components/toast/toast';

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
        recentTopics: [],
      };
    },
    components: {
      NavBar, ModuleState, RecentTopicItem, Toast,
    },
    created() {
      if (this.auth && this.auth.token && this.auth.loginName) {
        this.getRecentTopics(this.auth.loginName);
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
      // 主题编辑
      topicEdit(id) {
        const topicEditUrl = `/edit/${id}`;
        const to = {
          path: topicEditUrl,
        };
        this.$router.push(to);
      },
      // 主题预览
      topicPreview(id) {
        const topicPreviewUrl = `/detail/${id}`;
        const to = {
          path: topicPreviewUrl,
        };
        this.$router.push(to);
      },
      // 主题删除
      topicDel(id) {
        console.log(id);
        Toast({
          content: '删除功能即将上线',
          position: 'bottom',
          duration: 1500,
        });
      },
      // 加载失败
      failClickHandler() {
        this.getRecentTopics();
      },
      // 获取用户最近回复
      getRecentTopics(userName) {
        console.log('获取用户最近发布', userName);
        this.moduleLoadState = 0;
        request.getRecentTopics(userName, (res) => {
          console.log(res);
          // 初始化加载成功
          this.moduleLoadState = 2;
          if (res.success) {
            const recentTopics = res.data.recent_topics;
            if (recentTopics.length) {
              // 格式化发布事件 与 最新回复时间
              recentTopics.forEach((item) => {
                item.last_reply_at = moment(item.last_reply_at).fromNow();
              });

              this.recentTopics = recentTopics;
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
    },
  };
</script>
