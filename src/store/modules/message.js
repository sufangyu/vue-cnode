import request from '@/api/request';
import { GET_MESSAGE_COUNT, SET_GET_MESSAGE_COUNT_ING, REMOVE_GET_MESSAGE_COUNT_ING } from '../constants';

const state = {
  isGetMessageCounted: false,
  isGetMessageCounting: false,
  messageCount: 0,
};

const getters = {
  isGetMessageCounted: (state) => {
    return state.isGetMessageCounted;
  },
  isGetMessageCounting: (state) => {
    return state.isGetMessageCounting;
  },
  messageCount: (state) => {
    return state.messageCount;
  },
};

const actions = {
  // 获取未读信息数量
  getMessageCount: ({ commit }, data) => {
    commit(SET_GET_MESSAGE_COUNT_ING);

    request.getMessageCount(data, (res) => {
      if (res.success) {
        commit(GET_MESSAGE_COUNT, res.data);
        commit(REMOVE_GET_MESSAGE_COUNT_ING);
      } else {
        console.log('获取未读信息数据失败 =>>', res);
        commit(REMOVE_GET_MESSAGE_COUNT_ING);
      }
    });
  },
};

const mutations = {
  [GET_MESSAGE_COUNT](state, count) {
    state.isGetMessageCounted = true;
    state.messageCount = count;
  },
  [SET_GET_MESSAGE_COUNT_ING](state) {
    state.isGetMessageCounting = true;
  },
  [REMOVE_GET_MESSAGE_COUNT_ING](state) {
    state.isGetMessageCounting = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
