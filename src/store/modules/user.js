import {
  SET_USER_INFO,
  SET_AUTH,
  GET_AUTH,
  REMOVE_LOGIN_STORAGE,
} from '../constants';

const state = {
  auth: {
    token: '',
    loginName: '',
  },
  userInfo: {
    id: '',
    avatarUrl: '',
    loginName: '',
  },
};

const getters = {
  // 认证信息
  auth: (state) => {
    return state.auth;
  },
  // 已登录
  isLogged: (state) => {
    return !!state.userInfo.id;
  },
  // 用户信息
  userInfo: (state) => {
    return state.userInfo;
  },
};

const actions = {
  getAuth: ({ commit }) => {
    commit(GET_AUTH);
  },
  setUserInfo: ({ commit }, userInfo) => {
    commit(SET_USER_INFO, userInfo);
  },
  setAuth: ({ commit }, auth) => {
    commit(SET_AUTH, auth);
  },
  // 退出登录
  logout: ({ commit }) => {
    // 重置 vuex 中的用户信息 与 验证信息
    const auth = {
      token: '',
      loginName: '',
    };
    const userInfo = {
      avatarUrl: '',
      loginName: '',
    };
    commit(SET_AUTH, auth);
    commit(SET_USER_INFO, userInfo);

    // 清除缓存
    commit(REMOVE_LOGIN_STORAGE);
  },
};

const mutations = {
  [GET_AUTH](state) {
    state.auth = JSON.parse(localStorage.getItem('auth'));
  },
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [SET_AUTH](state, auth) {
    state.auth = {
      token: auth.token,
      loginName: auth.loginName,
    };
    localStorage.setItem('auth', JSON.stringify(state.auth));
  },
  [REMOVE_LOGIN_STORAGE]() {
    localStorage.removeItem('auth');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
