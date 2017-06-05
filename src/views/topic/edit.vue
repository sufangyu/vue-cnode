<template>
  <div class="page page-edit">
    <nav-bar title="编辑主题" fixed>
      <div class="topic-detail__actions" slot="right">
        <span @click="submitTopic"><icon value="send"/></span>
      </div>
    </nav-bar>

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
      :failText="moduleFailText"
    />

    <topic-edit
      v-show="this.moduleLoadState === 2"
      :tab="topicTab"
      :title="topicTitle"
      :content="topicContent"
      @selectTab="selectTopicTab"
      @inputTitle="inputTopicTitle"
      @inputContent="inputTopicContent"
    />
  </div>
</template>

<script>
import NavBar from '@/components/navbar';
import Icon from '@/components/icon';
import TopicEdit from '@/components/combination';
import ModuleState from '@/components/states';
import Toast from '@/components/toast/toast';

import request from '@/api/request';
import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';

export default {
  name: 'topic-update',
  mixins: [auth, unlogin],
  data() {
    return {
      topicTab: '',
      topicTitle: '',
      topicContent: '',
      isSubmitting: false,
      moduleLoadState: 0,     // 模块初始化加载状态
      moduleLoadFirst: true,  // 模块初始化加载
      moduleFailText: '获取数据失败，点击重试 ~~',
    };
  },
  computed: {
    topicId() {
      return this.$route.params.id || '';
    },
  },
  components: {
    NavBar, Icon, TopicEdit, ModuleState, Toast,
  },
  watch: {
    $route: 'getTopicDetail',
  },
  created() {
    if (!(this.auth && this.auth.token && this.auth.loginName)) {
      // 未登录, 重定向到到登录页
      this.redirectToLogin();
      return;
    }
    setTimeout(() => {
      this.getTopicDetail();
    }, 1000);
  },
  mounted() {
    this.$store.dispatch('hideTabBar');
    this.$store.dispatch('setAppLightBg');
  },
  destroyed() {
    this.$store.dispatch('showTabBar');
    this.$store.dispatch('removeAppLightBg');
  },
  methods: {
    // 加载失败点击事件
    failClickHandler() {
      setTimeout(() => {
        this.getTopicDetail();
      }, 1000);
    },
    // 获取详细资料
    getTopicDetail() {
      if (!this.topicId) {
        // 不存在主题 id
        this.moduleLoadState = -1;
        this.moduleFailText = '不存在主题 id';
        return;
      }
      this.moduleLoadState = 0;
      const data = this.requestAccessToken;
      data.mdrender = false;
      request.getTopicDetail(this.topicId, this.requestAccessToken, (res) => {
        // 初始化加载成功
        this.moduleLoadState = 2;

        if (res.success) {
          this.topicTab = res.data.tab;
          this.topicTitle = res.data.title;
          this.topicContent = res.data.content;
        }
      }, (err) => {
        console.log(err);
        // 初始化加载失败
        this.moduleLoadState = -1;
        this.moduleFailText = err.error_msg;
      });
    },
    // 返回最近发布
    goRecentTopics() {
      const recentTopicsUrl = '/user/recenttopics';
      const to = {
        path: recentTopicsUrl,
      };

      this.$router.replace(to);
    },
    // 更改标题
    inputTopicTitle(title) {
      console.log(title);
      this.topicTitle = title;
    },
    // 更改内容
    inputTopicContent(content) {
      this.topicContent = content;
    },
    // 选择类别
    selectTopicTab(tab) {
      this.topicTab = tab;
    },
    // 提交
    submitTopic() {
      console.log(this.topicTitle);
      let emptyTip = '';
      if (!this.topicTab) {
        emptyTip = '类别不能为空';
      } else if (!this.topicTitle) {
        emptyTip = '标题不能为空';
      } else if (!this.topicContent) {
        emptyTip = '主题内容不能为空';
      }

      if (emptyTip) {
        // 类别为空
        Toast({
          content: emptyTip,
          position: 'bottom',
          duration: 1500,
        });
        return;
      } else if (this.isSubmitting) {
        // 正在提交
        return;
      }

      this.isSubmitting = true;
      const data = this.requestAccessToken;
      data.topic_id = this.topicId;
      data.title = this.topicTitle;
      data.tab = this.topicTab;
      data.content = this.topicContent;

      request.updateTopics(data, (res) => {
        this.isSubmitting = false;
        if (res.success) {
          Toast({
            content: '修改主题成功',
            position: 'bottom',
            duration: 1500,
            onCloseCallback: () => {
              this.goRecentTopics();
            },
          });
        } else {
          const failMsg = res.error_msg || '修改主题失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        this.isSubmitting = false;

        const errMsg = err.error_msg || '修改主题失败, 请重试';
        Toast({
          content: errMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
    },
  },
};
</script>
