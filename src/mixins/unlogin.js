/**
 * @Created by 方雨 on 2017/5/13.
 * 返回上一页未登录
 */
export default {
  methods: {
    // 未登录, 重定向到到登录页
    redirectToLogin() {
      this.$router.replace({
        path: '/login',
        query: {
          redirect: this.$route.fullPath,
        },
      });
    },
  },
};
