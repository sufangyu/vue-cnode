import { SET_LIGHT_BG, REMOVE_LIGHT_BG } from '../constants';

const state = {
  isLightBg: false,
};

const getters = {
  isLightBg: (state) => {
    return state.isLightBg;
  },
};

const actions = {
  // 设置浅色背景
  setAppLightBg: ({ commit }) => {
    commit(SET_LIGHT_BG);
  },
  // 删除浅色背景
  removeAppLightBg: ({ commit }) => {
    commit(REMOVE_LIGHT_BG);
  },
};

const mutations = {
  [SET_LIGHT_BG](state) {
    state.isLightBg = true;
  },
  [REMOVE_LIGHT_BG](state) {
    state.isLightBg = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
