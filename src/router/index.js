import Vue from 'vue';
import Router from 'vue-router';
import routesConfig from './router.config';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: routesConfig,
});
