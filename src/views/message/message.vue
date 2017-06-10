<template>
  <div class="page page-message">
    <tabs
      :value="activeTab" @change="tabChangeHandler"
    >
      <tab value="read" title="未读信息"></tab>
      <tab value="unread" title="已读信息"></tab>
    </tabs>

    <div v-if="activeTab === 'unread'">
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
        v-if="read.length === 0 && moduleLoadState === 2"
        state="1"
        emptyText="暂时没有已读信息 ~~"
      />

      <div class="message-timeline">
        <message-item
          v-for="(item, index) in read"
          :item="item"
          :key="index"
          @click="toDetail(item.topic.id)"
        />
      </div>
    </div>

    <div v-if="activeTab === 'read'">
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
        v-if="unRead.length === 0 && moduleLoadState === 2"
        state="1"
        emptyText="暂时没有未读信息 ~~"
      />

      <div class="message-timeline">
        <message-item
          v-for="(item, index) in unRead"
          :item="item"
          :key="index"
          @click="toDetail(item.topic.id);setRead(item.topic.id)"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { Tabs, Tab } from '@/components/tabs';
import ModuleState from '@/components/states';
import { MessageItem } from '@/components/listItems';

import moment from 'moment';
import request from '@/api/request';
import auth from '@/mixins/auth';
import unlogin from '@/mixins/unlogin';

moment.locale('zh-cn');

export default {
  name: 'message',
  mixins: [auth, unlogin],
  data() {
    return {
      moduleLoadState: 0,     // 模块初始化加载状态
      activeTab: 'read',      // 当前 tab value
      read: [],    // 已读信息
      unRead: [],  // 未读信息
    };
  },
  components: {
    Tabs, Tab, ModuleState, MessageItem,
  },
  created() {
    if (this.auth && this.auth.token && this.auth.loginName) {
      this.getMessages();
    } else {
      // 未登录, 重定向到到登录页
      this.redirectToLogin();
    }
  },
  methods: {
    // 加载失败
    failClickHandler() {
      this.moduleLoadState = 0;
      setTimeout(() => {
        this.getMessages();
      }, 2000);
    },
    // 获取未读信息 and 已读信息
    getMessages() {
      const data = this.requestAccessToken;
      data.mdrender = false;

      request.getMessages(data, (res) => {
        console.log(res);
        // 初始化加载成功
        this.moduleLoadState = 2;

        if (res.success) {
          res.data.has_read_messages.forEach((item) => {
            item.create_at = moment(item.create_at).fromNow();
          });

          res.data.hasnot_read_messages.forEach((item) => {
            item.create_at = moment(item.create_at).fromNow();
          });

          this.read = res.data.has_read_messages;
          this.unRead = res.data.hasnot_read_messages;
        }
      }, (err) => {
        console.log(err);
        // 初始化加载失败
        this.moduleLoadState = -1;
      });
    },
    // 标记消息为已读
    setRead(id) {
      request.setMessageRead(id, this.requestAccessToken, (res) => {
        console.log('标记已读 - 成功', res);
      }, (err) => {
        console.log('标记已读 - 失败', err);
      });
    },
    // 切换 tab
    tabChangeHandler(value) {
      this.activeTab = value;
    },
    // 跳转到主题详情
    toDetail(id) {
      const detailPath = `detail/${id}`;
      this.$router.push({
        path: detailPath,
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.message-timeline {
  padding: px2rem(30px);

  .message {
    cursor: pointer;
  }
}
</style>
