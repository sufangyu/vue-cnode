<template>
  <div class="page page-components">
    <ul class="component-nav">
      <li><router-link :to="{ path: '/component/iconfont'}">图标</router-link></li>
      <li><router-link :to="{ path: '/component/badge'}">徽标数</router-link></li>
      <li><router-link :to="{ path: '/component/textfield'}">文本框</router-link></li>
      <li><router-link :to="{ path: '/component/checkbox'}">复选框</router-link></li>
      <li><router-link :to="{ path: '/component/buttons'}">按钮</router-link></li>
      <li><router-link :to="{ path: '/component/loader'}">加载中圆形</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'c-nav',
};
</script>

<style lang="scss" scoped>
@import "../../style/import";

.component-nav {
  padding: $space-blank-base;

  li {
    padding: $space-blank-sm 0;
  }
}
</style>
