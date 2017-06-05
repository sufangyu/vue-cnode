/**
 * @Created by 方雨 on 2017/4/30.
 * 获取未读信息数量
 */
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'messageCount',
      'isGetMessageCounted',
      'isGetMessageCounting',
    ]),
  },
  created() {
    // 未请求中 && 未请求 && 有 token 时, 请求获取未读信息数量
    if (!this.isGetMessageCounting && !this.isGetMessageCounted && this.auth && this.auth.token) {
      this.getMessageCount(this.requestAccessToken);
    }
  },
  methods: {
    ...mapActions([
      'getMessageCount',
    ]),
  },
};
