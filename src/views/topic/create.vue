<template>
  <div class="page page-create">
    <nav-bar title="新建主题" fixed>
      <div class="topic-detail__actions" slot="right">
        <span @click="submitTopic"><icon value="send"/></span>
      </div>
    </nav-bar>

    <topic-edit
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
import Toast from '@/components/toast/toast';
import TopicEdit from '@/components/combination';

import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';
import request from '@/api/request';

export default {
  name: 'topic-create',
  mixins: [auth, unlogin],
  data() {
    return {
      topicTab: '',
      topicTitle: '',
      topicContent: '',
      isSubmitting: false,
      topicTabs: [
        {
          label: '问答',
          value: 'ask',
        },
        {
          label: '分享',
          value: 'share',
        },
        {
          label: '招聘',
          value: 'job',
        },
        {
          label: '测试发表',
          value: 'dev',
        },
      ],
      open: false,
      configs: {
        status: false, // 禁用底部状态栏
        spellChecker: false, // 禁用拼写检查
      },
    };
  },
  computed: {
    topicId() {
      return this.$route.params.id;
    },
  },
  components: {
    NavBar, Icon, TopicEdit,
  },
  created() {
    if (!(this.auth && this.auth.token && this.auth.loginName)) {
      // 未登录, 重定向到到登录页
      this.redirectToLogin();
    }
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
    // 返回主题
    goTopicDetail(id) {
      const commentUrl = `/detail/${id}`;
      const to = {
        path: commentUrl,
      };

      this.$router.replace(to);
    },
    // 更改标题
    inputTopicTitle(title) {
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
    // 提交主题
    submitTopic() {
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
      data.title = this.topicTitle;
      data.tab = this.topicTab;
      data.content = this.topicContent;

      request.createTopics(data, (res) => {
        this.isSubmitting = false;
        console.log(res);

        if (res.success) {
          Toast({
            content: '新建主题成功',
            position: 'bottom',
            duration: 1500,
            onCloseCallback: () => {
              this.goTopicDetail(res.topic_id);
            },
          });
        } else {
          const failMsg = res.error_msg || '新建主题失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        this.isSubmitting = false;

        const errMsg = err.error_msg || '新建主题失败, 请重试';
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
