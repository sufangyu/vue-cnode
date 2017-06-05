<template>
  <div id="app" :class="{ 'app-full': isTabBarHidden, 'app-light': isLightBg }">
    <div class="app-view">
      <router-view></router-view>
    </div>

    <tab-bar :hidden="isTabBarHidden">
      <tab-bar-item
        title="首页"
        value="home"
        :iconName="homeIcon"
        to="/"
        :active="$route.path.toLowerCase() === '/'"
      />
      <tab-bar-item
        title="消息"
        value="message"
        iconName="message"
        to="/message"
        :active="$route.path.toLowerCase() === '/message'"
      >
        <badge dot :hideDot="messageCount === 0">
          <icon :value="messageIcon" size="xs"/>
        </badge>
      </tab-bar-item>
      <tab-bar-item
        title="我"
        value="user"
        :iconName="userIcon"
        to="/user/index"
        :active="$route.path.search(/\/user/ig) !== -1"
      />
      <tab-bar-item
        title="实验室"
        value="component"
        :iconName="libsIcon"
        to="/component"
        :active="$route.path.search(/\/component/ig) !== -1"
      />
    </tab-bar>
  </div>
</template>

<script>
import Badge from '@/components/badge';
import Icon from '@/components/icon';
import { TabBar, TabBarItem } from '@/components/tabbar';

import { mapGetters } from 'vuex';
import message from '@/mixins/message';
import auth from '@/mixins/auth';

export default {
  name: 'app',
  mixins: [auth, message],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'isTabBarHidden',
      'isLightBg',
    ]),
    homeIcon() {
      return this.$route.path.toLowerCase() === '/' ? 'home-fill' : 'home';
    },
    messageIcon() {
      return this.$route.path.search(/\/message/ig) !== -1 ? 'message-fill' : 'message';
    },
    userIcon() {
      return this.$route.path.search(/\/user/ig) !== -1 ? 'user-fill' : 'user';
    },
    libsIcon() {
      return this.$route.path.search(/\/component/ig) !== -1 ? 'libs-fill' : 'libs';
    },
  },
  components: {
    TabBar, TabBarItem, Badge, Icon,
  },
  methods: {
    // 改变当前 tabBar 的值
    tabBarChangeHandle(val) {
      this.tabBarValue = val;
    },
  },
};
</script>

<style lang="scss">
@import "./style/index";
</style>
