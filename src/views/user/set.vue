<template>
  <div class="page page-set">
    <nav-bar
      fixed
      title="设置"
    />

    <panel-simple>
      <list-menu line>
        <list-menu-item
          title="关于 CNode 社区"
          iconName="company-fill"
          iconColor="teal300"
          :to="{ path: 'cnode' }"
        />
        <list-menu-item
          title="清除缓存"
          iconName="clear-fill"
          iconColor="teal300"
          :hasArrow="false"
          disabled
        />
        <list-menu-item
          title="当前版本"
          :extra="version"
          :hasArrow="false"
          iconName="version-fill"
          iconColor="teal300"
        ></list-menu-item>
      </list-menu>
    </panel-simple>

    <panel-simple
    >
      <yu-button
        class="logout__button"
        primary
        fullWidth
        label="退出登录"
        @click.native="logout"
      />
    </panel-simple>
  </div>
</template>

<script>
import NavBar from '@/components/navbar';

import { Button } from '@/components/buttons';
import { PanelSimple } from '@/components/panel';
import { ListMenu, ListMenuItem } from '@/components/lists';
import Icon from '@/components/icon';

import auth from '@/mixins/auth';

export default {
  name: 'user-set',
  mixins: [auth],
  data() {
    return {
      version: '1.0.0',
    };
  },
  components: {
    PanelSimple, Icon, ListMenu, ListMenuItem, NavBar, 'yu-button': Button,
  },
  created() {
  },
  methods: {
    // 退出登录
    logout() {
      console.log('退出登录');
      // 退出登录
      this.$store.dispatch('logout');
      // 返回首页
      this.$router.replace('/');
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.logout__button {
  margin: px2rem(14px) 0;
}
</style>
