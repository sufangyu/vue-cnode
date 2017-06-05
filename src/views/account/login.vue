<template>
  <div class="page page-login page-light">
    <nav-bar title="登录" fixed/>
    <div class="login-content">
      <div class="login-placeholder">
        <img src="../../assets/default-avatar.png" />
      </div>

      <div class="form login-form">
        <div class="form-group">
          <text-field label="AccessToken" hintText="请输入 AccessToken" labelFloat v-model="accessToken" @input="inputHandle"/>
        </div>
        <div class="flex flex-between form__extra">
          <div>
            <checkbox label="自动登录" v-model="autoLogin"/>
          </div>
          <div>
            <a href="javascript:;">忘记 Access Token ？</a>
          </div>
        </div>
        <div class="form__button">
          <yu-button @click.native="login" label="立即登录" type="flat" size="lg" :disabled="submitButtonDisable" fullWidth primary />
        </div>
      </div>

      <div class="login-other">
        <divider label="或" space="lg"/>
        <p><a href="https://www.cnodejs.org" target="_blank">还没有账号？立即注册</a></p>
      </div>

    </div>
  </div>
</template>

<script>
// @ https://github.com/Ryqsky/cnode_vue/blob/master/src/views/Login.vue
import NavBar from '@/components/navbar';
import TextField from '@/components/textField';
import Checkbox from '@/components/checkbox';
import { Button } from '@/components/buttons';
import Divider from '@/components/divider';
import Toast from '@/components/toast/toast';
import request from '@/api/request';

export default {
  name: 'login',
  data() {
    return {
//      accessToken: 'f24da430-fbcd-4710-880c-f53bb289924f',
      accessToken: '974395a4-8d5b-498e-ac14-b7ca8f143594',
      autoLogin: true,
    };
  },
  computed: {
    // 登录按钮是否可用
    submitButtonDisable() {
      return !this.accessToken;
    },
  },
  components: {
    NavBar, TextField, Checkbox, 'yu-button': Button, Divider,
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
    inputHandle() {
      this.submitButtonDisable = !this.accessToken;
    },
    login() {
      if (!this.accessToken) {
        console.log('Token 不能为空');
      } else {
        const loginToast = Toast({
          content: '正在登录',
          icon: 'loading',
          duration: 0,
        });
        request.login({
          accesstoken: this.accessToken,
        }, (res) => {
          console.log('登录成功 =>>', res);
          if (res.success) {
            // 存储用户信息
            this.$store.dispatch('setAuth', {
              type: 1,
              token: this.accessToken,
              loginName: res.loginname,
            });
            // 设置用户信息
            this.$store.dispatch('setUserInfo', {
              id: res.id,
              avatarUrl: res.avatar_url,
              loginName: res.loginname,
            });

            loginToast.update({
              content: '登录成功',
              icon: 'success',
              duration: 1500,
              onCloseCallback: () => {
                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data());
                console.log('跳转到首页 or redire');
                this.$router.replace(this.$route.query.redirect || '/');
              },
            });
          } else {
            loginToast.update({
              content: res.error_msg,
              icon: 'success',
              duration: 1500,
            });
          }
        }, (err) => {
          console.log('登录失败 =>>', err);
          loginToast.update({
            content: '登录失败, 请重试',
            icon: 'offline',
            duration: 1500,
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/import";

.login-placeholder {
  height: px2rem(200px);
  position: relative;
  background-color: $primary-color;
  margin-bottom: px2rem(85px);

  img {
    display: block;
    width: px2rem(150px);
    height: px2rem(150px);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) translateY(50%);
  }
}

.login-form {
  margin-top: px2rem(160px);
  padding-left: $space-blank-base;
  padding-right: $space-blank-base;
}
.form__extra {
  margin-bottom: px2rem(60px);
  color: $grey;
  background-color: rgba(0,0,0,0);

  a {
    color: $grey;
  }
}
.login-other {
  padding-left: $space-blank-base;
  padding-right: $space-blank-base;
  text-align: center;

  a {
    color: $grey;
  }
}
</style>
