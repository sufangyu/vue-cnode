<template>
  <div class="page page-topic">
    <nav-bar fixed>
      <div class="topic-detail__actions" slot="right">
        <span @click="goToComment(topicId)"><icon value="comment" size="xs" /></span>
        <span @click="collectActions(topicId)"><icon :value="collect.stateIcon" size="xs" /></span>
        <span @click="handleShowShare"><icon value="share" size="xs" /></span>
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

    <div class="topic-detail" v-show="this.moduleLoadState === 2">
      <panel-simple
        noDistanceTop
      >
        <div class="topic-detail__title">
          <h1>{{ topicDetail.title }}</h1>
        </div>

        <div class="topic-detail__media flex flex-between">
          <div class="topic-detail__media__left">
            <div class="flex">
              <div class="topic-detail__avatar">
                <img class="img-avatar lazy-img-fadein" v-lazy="topicDetail.avatar_url" src="../../assets/default-avatar.png" />
              </div>
              <div class="flex-1">
                <div class="topic-detail__author">{{ topicDetail.loginname }}</div>
                <div class="topic-detail__create">{{ topicDetail.create_at }}</div>
              </div>
            </div>
          </div>
          <div class="topic-detail__media__right">
            <div class="topic-detail__tag">{{ tab }}</div>
            <div class="topic-detail__extra">
              <span>
                <Icon value="view"/>
                <em>{{ topicDetail.visit_count }}</em>
              </span>
                  <span>
                <Icon value="comment"/>
                <em>{{ topicDetail.reply_count }}</em>
              </span>
            </div>
          </div>
        </div>

        <div class="topic-detail__content markdown-body" v-html="topicDetail.content">
        </div>
      </panel-simple>

      <panel-simple
        title="全部评论"
        inside
        noDistanceTop
        noDistanceBottom
        wingBlank
        whiteSpace
      >
        <!-- 没有结果 -->
        <module-state
          v-if="topicDetail.replies && topicDetail.replies.length === 0 && moduleLoadState === 2"
          state="1"
          type="line"
          size="sm"
          emptyText="暂时没有评论内容 ~~"
        />

        <comment-item
          v-for="(item, index) in topicDetail.replies"
          :item="item"
          :key="index"
          @praise="praiseHandler"
          @reply="replyHandler"
        />
      </panel-simple>
    </div>

    <share-popup
      :open="shareOpen"
      :clickOverlay="true"
      :closeShow="false"
      :footerShow="false"
      :headerShow="false"
      :share="share"
      @show="handleShowShare"
      @hide="handleHideShare"
    >
    </share-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar';
import { PanelSimple } from '@/components/panel';
import Icon from '@/components/icon';
import { CommentItem } from '@/components/listItems';
import ModuleState from '@/components/states';
import SharePopup from '@/components/share';
import Toast from '@/components/toast/toast';

import moment from 'moment';
import request from '@/api/request';
import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';

moment.locale('zh-cn');

export default {
  name: 'topic-detail',
  mixins: [auth, unlogin],
  data() {
    return {
      tab: '',
      topicDetail: {},
      collect: {
        stateIcon: 'collection',
        action: 'collect',
      },
      share: {
        url: '',      // 分享的地址
        title: '',   // 分享的标题
        content: '', // 分享的内容
        image: '',   // 分享的图片
      },
      shareOpen: false,
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
  watch: {
    $route: 'getTopicDetail',
  },
  components: {
    NavBar, PanelSimple, Icon, CommentItem, ModuleState, SharePopup,
  },
  created() {
    setTimeout(() => {
      this.getTopicDetail();
    }, 1000);
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
      setTimeout(() => {
        this.getTopicDetail();
      }, 1000);
    },
    getTabName(tab) {
      switch (tab) {
        case 'good':
          this.tab = '精华';
          break;
        case 'share':
          this.tab = '分享';
          break;
        case 'ask':
          this.tab = '问答';
          break;
        case 'job':
          this.tab = '招聘';
          break;
        case 'dev':
          this.tab = '测试';
          break;
        default:
      }
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
      request.getTopicDetail(this.topicId, this.requestAccessToken, (res) => {
        // 初始化加载成功
        this.moduleLoadState = 2;

        if (res.success) {
          this.getTabName(res.data.tab);
          this.moduleLoadFirst = false;

          res.data.create_at = moment(res.data.create_at).format('YYYY-MM-DD hh:MM:ss');
          res.data.avatar_url = res.data.author.avatar_url;
          res.data.loginname = res.data.author.loginname;

          res.data.replies.forEach((item) => {
            item.praise = item.ups.length;
            item.create_at = moment(item.create_at).fromNow();
            // 把用户信息页面指向到 hash 模式的用户信息页面
            item.content = item.content.replace(/href="\/user\//ig, 'href="#/user/info/');
          });
          if (res.data.is_collect) {
            this.setCollectState('collected');
          }
          this.topicDetail = res.data;

          // 分享信息
          this.share = {
            url: 'https://github.com/sufangyu', // window.location.href
            title: res.data.title,
            content: res.data.title,
            image: '',
          };
        }
      }, (err) => {
        console.log(err);
        // 初始化加载失败
        this.moduleLoadState = -1;
        this.moduleFailText = err.error_msg;
      });
    },
    // 显示分享
    handleShowShare() {
      if (!this.share.title) {
        return;
      }
      this.shareOpen = true;
    },
    // 隐藏分享
    handleHideShare() {
      this.shareOpen = false;
    },
    // 收藏
    collectActions(id) {
      // 没有初始化加载成功
      if (this.moduleLoadState !== 2) {
        return;
      }
      // 未登录
      if (!this.requestAccessToken.accesstoken) {
        Toast({
          content: '请先登录',
          position: 'bottom',
          duration: 1500,
          onCloseCallback: () => {
            this.redirectToLogin();
          },
        });
        return;
      }

      if (this.collect.action === 'collect') {
        this.collectHandler(id);
      } else if (this.collect.action === 'delCollect') {
        this.delCollectHandler(id);
      }
    },
    // 收藏主题
    collectHandler(id) {
      const data = this.requestAccessToken;
      data.topic_id = id;

      request.collect(data, (res) => {
        if (res.success) {
          Toast({
            content: '已收藏到 - 我的收藏',
            position: 'bottom',
            duration: 1500,
          });
          this.setCollectState('collected');
        } else {
          const failMsg = res.error_msg || '收藏失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        const errMsg = err.error_msg || '收藏失败, 请重试';
        Toast({
          content: errMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
    },
    // 取消收藏主题
    delCollectHandler(id) {
      const data = this.requestAccessToken;
      data.topic_id = id;
      request.delCollect(data, (res) => {
        if (res.success) {
          Toast({
            content: '已取消收藏',
            position: 'bottom',
            duration: 1500,
          });
          this.setCollectState('unCollect');
        } else {
          const failMsg = res.error_msg || '收藏失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        const errMsg = err.error_msg || '收藏失败, 请重试';
        Toast({
          content: errMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
    },
    // 设置收藏状态
    setCollectState(action) {
      if (action === 'collected') {
        // 已收藏
        this.collect.stateIcon = 'collection-fill';
        this.collect.action = 'delCollect';
      } else if (action === 'unCollect') {
        // 未收藏
        this.collect.stateIcon = 'collection';
        this.collect.action = 'collect';
      }
    },
    // 点赞
    praiseHandler(id) {
      // 未登录
      if (!this.requestAccessToken.accesstoken) {
        Toast({
          content: '请先登录',
          position: 'bottom',
          duration: 1500,
          onCloseCallback: () => {
            this.redirectToLogin();
          },
        });
        return;
      }

      const currentPraise = this.topicDetail.replies.filter((item) => {
        return item.id === id;
      });

      request.praise(id, this.requestAccessToken, (res) => {
        console.log(res);
        if (res.success) {
          const successMsg = res.action === 'up' ? '成功点赞' : '成功取消点赞';
          const step = res.action === 'up' ? 1 : -1;
          currentPraise[0].praise += step;
          currentPraise[0].is_uped = res.action === 'up';

          Toast({
            content: successMsg,
            position: 'bottom',
            duration: 1500,
          });
        } else {
          const failMsg = res.error_msg || '点赞失败, 请重试';
          Toast({
            content: failMsg,
            position: 'bottom',
            duration: 1500,
          });
        }
      }, (err) => {
        console.log(err);
        const errMsg = err.error_msg || '点赞失败, 请重试';
        Toast({
          content: errMsg,
          position: 'bottom',
          duration: 1500,
        });
      });
    },
    // 回复
    replyHandler(id, name) {
      console.log(id, name);
      this.goToComment(this.topicId, id, name);
    },
    // 跳转到留言页面
    goToComment(topicId, replyId, replyUserName) {
      const commentUrl = `/comment/${topicId}`;
      const to = {
        path: commentUrl,
      };

      if (replyId) {
        to.query = {
          id: replyId,
          name: replyUserName,
        };
      }
      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";
@import "../../style/markdown";

.topic-detail {

  &__actions {
    .iconfont {
      font-size: px2rem(40px);
    }
    span {
      padding: 0 px2rem(10px);
      cursor: pointer;
    }
  }

  &__title {
    padding: px2rem(40px) px2rem(30px) px2rem(30px);
    border-bottom: 1px solid #ccc;
    h1 {
      font-size: px2rem(40px);
      line-height: 1.4;
    }
  }

  &__media {
    padding: px2rem(30px);

    .topic-detail__avatar {
      width: px2rem(76px);
      height: px2rem(76px);
      margin-right: px2rem(20px);

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .topic-detail__author {
      font-size: px2rem(30px);
      margin-bottom: px2rem(18px);
    }
    .topic-detail__create {
      font-size: px2rem(24px);
      opacity: 0.5;
    }

    &__right {
      text-align: right;
      font-size: px2rem(24px);

      .topic-detail__tag {
        display: inline-block;
        padding: px2rem(6px) px2rem(10px);
        border-radius: px2rem(6px);
        margin-bottom: px2rem(10px);
        color: $white;
        font-size: px2rem(20px);
        background-color: $primary-color;
      }

      .topic-detail__extra {
        opacity: 0.5;

        span {
          margin-left: px2rem(20px);
          cursor: pointer;
        }
        .iconfont {
          font-size: px2rem(30px);
        }
      }
    }
  }

  &__content {
    padding: px2rem(10px) px2rem(30px) px2rem(30px);

    p {
      line-height: 1.6;
      margin-bottom: px2rem(50px);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
