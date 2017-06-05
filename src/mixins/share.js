/**
 * 分享
 */
export default {
  data() {
    return {
      isShowActionSheetShare: false,    // 是否显示分享列表 弹窗
      isShowPopupShareToWechat: false,  // 是否显示分享到微信 Popup 弹窗
      isShowActionSheetShareToWechat: false,  // 是否显示分享到微信 AvtionSheet 弹窗
    };
  },
  props: {
    share: {
      type: Object,
      default() {
        return ({
          url: '',      // 分享的地址
          title: '',   // 分享的标题
          content: '', // 分享的内容
          image: '',   // 分享的图片
        });
      },
    },
  },
  methods: {
    showActionSheetShare() {
      this.$emit('show');
    },
    hideActionSheetShare() {
      this.$emit('hide');
    },
    showActionSheetShareToWechat() {
      this.isShowActionSheetShareToWechat = true;
    },
    hideActionSheetShareToWechat() {
      this.isShowActionSheetShareToWechat = false;
    },
    showPopupShareToWechat() {
      this.isShowPopupShareToWechat = true;
    },
    hidePopupShareToWechat() {
      this.isShowPopupShareToWechat = false;
    },
    // 新浪微博
    shareToSina() {
      const URL = `http://service.weibo.com/share/share.php?url=${this.share.url}&title=${this.share.content}&appkey=&pic=${this.share.image}`;
      this.shareTo(URL);
    },
    // 腾讯微博
    shareToQt() {
    },
    // QQ 空间
    shareToQzone() {
      console.log(this.share);
      const URL = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.share.url}&title=${this.share.title}&desc=${this.share.content}&summary=${this.share.content}&site=&pics=${this.share.image}`;
      this.shareTo(URL);
    },
    // QQ 好友
    shareToQQ() {
      const URL = `https://connect.qq.com/widget/shareqq/index.html?url=${this.share.url}&title=${this.share.content}&desc=&summary=&site=&pics=${this.share.image}`;
      this.shareTo(URL);
    },
    // 豆瓣
    shareToDouban() {
      const URL = `https://www.douban.com/share/service?href=${this.share.url}&name=${this.share.title}&text=${this.share.content}&image=${this.share.image}`;
      this.shareTo(URL);
    },
    // 易信
    shareToYixin() {
      const URL = `http://open.yixin.im/share?type=text&href=${this.share.url}&text=${this.share.title}&userdesc=${this.share.content}&image=${this.share.image}`;
      this.shareTo(URL);
    },
    // 创建分享新窗口
    shareTo(url) {
      const NEW_WINDOW = window.open('about:blank');
      NEW_WINDOW.location.href = url;

      this.hideActionSheetShare();
    },
    // 微信
    shareToWechat() {
      console.log('分享到微信');
      this.hideActionSheetShare();
      this.showActionSheetShareToWechat();
    },
  },
};
