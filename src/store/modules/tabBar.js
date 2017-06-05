import { HIDE_TAB_BAR, SHOW_TAB_BAR } from '../constants';

const state = {
  isTabBarHidden: false,
};

const getters = {
  isTabBarHidden: (state) => {
    return state.isTabBarHidden;
  },
};

const actions = {
  hideTabBar: ({ commit }) => {
    commit(HIDE_TAB_BAR);
  },
  showTabBar: ({ commit }) => {
    commit(SHOW_TAB_BAR);
  },
};

const mutations = {
  [HIDE_TAB_BAR](state) {
    state.isTabBarHidden = true;
  },
  [SHOW_TAB_BAR](state) {
    state.isTabBarHidden = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
