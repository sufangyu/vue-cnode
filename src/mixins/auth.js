/**
 * @Created by 方雨 on 2017/4/30.
 * 认证信息
 */
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'auth',
      'isLogged',
    ]),
    // 请求的 token
    requestAccessToken() {
      return {
        accesstoken: this.auth ? this.auth.token : '',
      };
    },
  },
  created() {
    // 获取认证信息
    this.getAuth();
  },
  methods: {
    ...mapActions([
      'getAuth',
    ]),
  },
};
