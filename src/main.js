import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import App from './App';
import router from './router';
import store from './store';

Vue.use(VueLazyload);
Vue.config.productionTip = false;

// 生成一个全局的 EventBus
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});


router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过 vuex state获取当前的token是否存在
    if (store.getters.auth && store.getters.auth.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        },
      });
    }
  } else {
    next();
  }
});
