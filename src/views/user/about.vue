<template>
  <div class="page page-about">
    <nav-bar fixed title="关于项目" />

    <div class="page-about__content">
      <h3>关于项目</h3>
      <p>项目是基于 CNode 社区提供的 API，采用 VueJS 重写的 Webapp。</p>

      <h3>技术栈</h3>
      <p>项目基于 vue2、vue-router、vuex 进行开发，使用了 vue-cli 开发、编译打包。</p>

      <h3>源码地址</h3>
      <p><a href="https://github.com/sufangyu/vue-cnode/issues" target="_blank">https://github.com/sufangyu/vue-cnode</a></p>

      <h3>意见反馈</h3>
      <p><a href="https://github.com/sufangyu/vue-cnode" target="_blank">发表意见或者提需求</a></p>

      <h3>当前版本</h3>
      <p>V 1.0.0</p>

    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navbar';

  export default {
    name: 'user-cnode',
    data() {
      return {
        msg: 'hello vue',
      };
    },
    components: {
      NavBar,
    },
    mounted() {
      this.$store.dispatch('hideTabBar');
      this.$store.dispatch('setAppLightBg');
    },
    destroyed() {
      this.$store.dispatch('showTabBar');
      this.$store.dispatch('removeAppLightBg');
    },
  };
</script>

<style lang="scss">
  @import "../../style/import";

  .page-about {

    &__content {
      padding: px2rem(30px);
      line-height: 1.5;
      max-height: 999999px;

      h3 {
        font-size: px2rem(36px);
        margin-top: px2rem(50px);
        margin-bottom: px2rem(30px);
        color: $black;

        &:first-child {
          margin-top: 0;
        }
      }

      p {
        margin-bottom: px2rem(30px);

        :last-child {
          margin-bottom: 0;
        }
      }

      .logo__cnode {
        width: px2rem(640px);
        max-width: 80%;
        display: block;
        margin: 0 auto px2rem(80px);
      }
    }
  }

</style>
