<template>
  <div class="page page-topic">
    <nav-category :categories="categories" />

    <div class="topic-list">
      <topic-item
        v-for="(item, index) in topicData"
        :to="{ path: '/detail/'+item.id }"
        :item="item"
        :key="index"
        append
      />

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
        v-if="moduleLoadState === -1 && moduleLoadFirst"
        state="-1"
        @failClick="failClickHandler"
      />

      <infinite-loading :on-infinite="getTopics" ref="infiniteLoading">
        <div class="infinite__state" slot="spinner" v-show="!moduleLoadFirst">
          <loader size="xs"/>
          <span>正在加载...</span>
        </div>

        <!-- 没有结果 -->
        <module-state
          v-if="moduleLoadState === 1"
          state="1"
          slot="no-results"
        />

        <div class="infinite__state" slot="no-more">没有更多数据了</div>
      </infinite-loading>
    </div>

    <div class="action-button--affix">
      <yu-button
        circle
        secondary
        shadow
        :shadowDepth="5"
        type="flat"
        icon="pen"
        size="lg"
        :to="{ path: '/create' }"
      />
    </div>
  </div>
</template>

<script>
import { NavCategory } from '@/components/nav';
import Icon from '@/components/icon';
import { Button } from '@/components/buttons';
import ModuleState from '@/components/states';
import { TopicItem } from '@/components/listItems';
import Loader from '@/components/loader';

import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';
import request from '@/api/request';

moment.locale('zh-cn');

export default {
  name: 'topic-list',
  data() {
    return {
      moduleLoadFirst: true,  // 模块初始化加载
      moduleLoadState: 0,     // 模块初始化加载状态
      currentPage: 0,         // 当前页数
      topicData: [],
    };
  },
  computed: {
    categories() {
      return [
        {
          name: '全部',
          tabValue: 'all',
          to: { path: '/', query: { tab: 'all' } },
          replace: true,
        },
        {
          name: '精华',
          tabValue: 'good',
          to: { path: '/', query: { tab: 'good' } },
          replace: true,
        },
        {
          name: '分享',
          tabValue: 'share',
          to: { path: '/', query: { tab: 'share' } },
          replace: true,
        },
        {
          name: '问答',
          tabValue: 'ask',
          to: { path: '/', query: { tab: 'ask' } },
          replace: true,
        },
        {
          name: '招聘',
          tabValue: 'job',
          to: { path: '/', query: { tab: 'job' } },
          replace: true,
        },
        {
          name: '测试',
          tabValue: 'dev',
          to: { path: '/', query: { tab: 'dev' } },
          replace: true,
        },
      ];
    },
    currentTab() {
      return this.$route.query.tab || this.categories[0].tabValue;
    },
    nextPage() {
      return this.currentPage + 1;
    },
  },
  components: {
    NavCategory, Icon, 'yu-button': Button, ModuleState, TopicItem, InfiniteLoading, Loader,
  },
  watch: {
    // 监听路由变化
    $route() {
      // 重置 data 数据
      Object.assign(this.$data, this.$options.data());
      this.currentTab = this.$route.query.tag;
      // 重置无限加载
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
      this.getTopics();
    },
  },
  methods: {
    failClickHandler() {
      console.log('重新请求~~~');
      this.moduleLoadState = 0;
      this.getTopics();
    },
    // 获取主题
    getTopics() {
      const data = {
        tab: this.currentTab,
        page: this.nextPage,
      };

      setTimeout(() => {
        request.getTopics(data, (res) => {
          // 初始化加载成功
          this.moduleLoadState = 2;

          if (res.success) {
            // 返回成功
            this.moduleLoadFirst = false;
            if (res.data.length) {
              // 格式化发布事件 与 最新回复时间
              res.data.forEach((item) => {
                item.last_reply_at = moment(item.last_reply_at).fromNow();
                item.create_at = moment(item.create_at).format('YYYY-MM-DD hh:MM:ss');
                item.content = item.content.replace(/\r/ig, '').replace(/\n/ig, '').replace(/#/ig, '').substring(0, 150);
              });

              this.topicData.push(...res.data);
              this.currentPage = this.nextPage;

              this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              });
              // 模拟没有数据
              /* if (data.page === 5) {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              } */
            } else {
              // 内容为空
              this.moduleLoadState = 1;
              this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              });
            }
          }
        }, (err) => {
          console.log(err);
          // 初始化加载失败
          this.moduleLoadState = -1;
        });
      }, 1000);
    },
  },
};
</script>
