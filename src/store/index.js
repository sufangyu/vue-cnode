/**
 * @Created by 方雨 on 2017/4/24.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import message from './modules/message';
import appBg from './modules/appBg';
import tabBar from './modules/tabBar';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    appBg,
    message,
    tabBar,
    user,
  },
});
