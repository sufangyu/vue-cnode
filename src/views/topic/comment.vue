<template>
  <div class="page page-comment">
    <nav-bar title="写评论" fixed>
      <div class="topic-detail__actions" slot="right">
        <span @click="submitComment"><icon value="send"/></span>
      </div>
    </nav-bar>

    <div class="comment-form">
      <text-field
        multiLine
        :hintText="commentPlaceHolder"
        v-model="commentContent"
      />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar';
import Icon from '@/components/icon';
import TextField from '@/components/textField';
import Toast from '@/components/toast/toast';

import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';
import request from '@/api/request';

export default {
  name: 'topic-comment',
  mixins: [auth, unlogin],
  data() {
    return {
      commentContent: '',
      isSubmitting: false,
    };
  },
  computed: {
    topicId() {
      return this.$route.params.id;
    },
    replyId() {
      return this.$route.query.id;
    },
    commentPlaceHolder() {
      const replyName = this.$route.query.name;
      return replyName ? `@${replyName}` : '说说你的评论';
    },
  },
  components: {
    NavBar, TextField, Icon,
  },
  created() {
    if (!(this.auth && this.auth.token && this.auth.loginName)) {
      // 未登录, 重定向到到登录页
      this.redirectToLogin();
      return false;
    }

    return true;
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
    // 提交评论
    submitComment() {
      if (!this.commentContent) {
        // 内容为空
        Toast({
          content: '评论内容不能为空',
          position: 'bottom',
          duration: 1500,
        });
        return false;
      } else if (this.isSubmitting) {
        // 正在提交
        return false;
      }

      this.isSubmitting = true;
      const data = this.requestAccessToken;
      data.content = this.commentContent;
      if (this.replyId) {
        // 回复评论
        data.reply_id = this.$route.query.id;
      }
      request.replies(this.topicId, data, (res) => {
        this.isSubmitting = false;

        if (res.success) {
          Toast({
            content: '评论成功',
            position: 'bottom',
            duration: 1500,
            onCloseCallback: () => {
              this.gobackTopic();
            },
          });
        } else {
          const failMsg = res.error_msg || '评论失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        this.isSubmitting = false;

        const errMsg = err.error_msg || '评论失败, 请重试';
        Toast({
          content: errMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
      return true;
    },
    // 返回主题
    gobackTopic() {
      const commentUrl = `/detail/${this.topicId}`;
      const to = {
        path: commentUrl,
      };

      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.comment-form {
  padding: px2rem(30px);
  min-height: calc(100vh - 1.3rem);

  .text-field {
    margin-bottom: 0;
  }

  .text-field__textarea {
    min-height: calc(30vh);
  }
}
</style>
