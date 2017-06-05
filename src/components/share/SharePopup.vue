<template>
  <div class="popup-share">
    <popup
      title="title"
      :open="open"
      :clickOverlay="clickOverlay"
      :closeShow="closeShow"
      :footerShow="footerShow"
      :headerShow="headerShow"
      @show="showActionSheetShare"
      @hide="hideActionSheetShare"
    >
      <slot>
        <div class="share-grids">
          <div class="share-item"
            v-for="(item, index) in socialList"
            :key="index"
            :data-empty="!item.iconValue"
            @click="shareAction(item.click, $event)"
          >
            <div class="share__social__image" v-if="item.iconValue">
              <icon :value="item.iconValue" :color="item.iconColor" />
            </div>
            <div class="share__social__name" v-if="item.name">{{ item.name }}</div>
          </div>
        </div>
      </slot>
    </popup>

    <popup
      title="长按复制下方链接，去粘贴给好友吧"
      :open="isShowActionSheetShareToWechat"
      :clickOverlay="clickOverlay"
      @show="showActionSheetShareToWechat"
      @hide="hideActionSheetShareToWechat"
    >
      <slot>
        <div class="share__copytip">{{share.url}}</div>
      </slot>
    </popup>
  </div>
</template>

<script>
// @TODO: 分享到微信

import Icon from '@/components/icon';
import Popup from '@/components/popup';

import shareMixin from '@/mixins/share';

export default {
  name: 'share-popup',
  mixins: [shareMixin],
  props: {
    // 点击遮罩层是否关闭弹窗
    clickOverlay: {
      type: Boolean,
      default: false,
    },
    // 是否显示关闭
    closeShow: {
      type: Boolean,
      default: false,
    },
    // 底部文案
    footer: {
      type: String,
      default: '取消',
    },
    // 是否显示取消
    footerShow: {
      type: Boolean,
      default: true,
    },

    // 是否显示头部
    headerShow: {
      type: Boolean,
      default: true,
    },
    // 平台列表
    list: {
      type: Array,
      default() {
        return ([
          {
            platform: 'sina',
            name: '新浪微博',
            iconValue: 'sina-fill',
            iconColor: 'red',
            click: () => {
              console.log('分享到新浪微博');
              this.shareToSina();
            },
          },
          {
            platform: 'wechat',
            name: '微信',
            iconValue: 'wechat-fill',
            iconColor: 'lightGreen',
            click: () => {
              this.shareToWechat();
            },
          },
          {
            platform: 'qq',
            name: 'QQ好友',
            iconValue: 'qq-fill',
            iconColor: 'blue',
            click: () => {
              this.shareToQQ();
            },
          },
          {
            platform: 'qzone',
            name: 'QQ空间',
            iconValue: 'qzone-fill',
            iconColor: 'orange',
            click: () => {
              this.shareToQzone();
            },
          },
          {
            platform: 'douban',
            name: '豆瓣',
            iconValue: 'douban-fill',
            iconColor: 'green',
            click: () => {
              this.shareToDouban();
            },
          },
          {
            platform: 'yixin',
            name: '易信',
            iconValue: 'yixin-fill',
            iconColor: 'blueGrey300',
            click: () => {
              this.shareToYixin();
            },
          },
        ]);
      },
    },
    // 是否显示
    open: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
    },
  },
  components: {
    Icon, Popup,
  },
  computed: {
    socialList() {
      const socialList = this.list;
      const completionLen = this.list.length % 4;
      for (let i = 0; i < completionLen; i++) {
        const empty = {
          platform: '',
          name: '',
          iconValue: '',
          iconColor: '',
        };
        socialList.push(empty);
      }
      return socialList;
    },
  },
  methods: {
    shareAction(callback, event) {
      const target = event.target || event.srcElement;
      const dataset = target.dataset;
      if (!dataset.empty) {
        if (callback) {
          callback();
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.share-grids {
  display: flex;
  flex-wrap: wrap;

  .share-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: calc(100vw/4);
    max-height: px2rem(400px);
    text-align: center;
    cursor: pointer;
    border-right: 1px solid $grey200;
    border-top: 1px solid $grey200;

    &:hover:not([data-empty]),
    &:active:not([data-empty]) {
      background-color: $grey100;
    }

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4) {
      border-top: none;
    }

    &:nth-of-type(4n+4) {
      border-right: none;
    }
  }

  .share__social {
    &__name {
      margin-top: px2rem(20px);
      font-size: px2rem(28px);
      color: $grey;
    }
  }
}
// 复制链接内容
.share__copytip {
  padding: px2rem(40px);
  font-size: px2rem(32px);
}
</style>
