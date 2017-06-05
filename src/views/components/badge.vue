<template>
  <div class="page page-components">

    <!--<panel-simple title="基本使用 - 多行">
      <grids class="grids&#45;&#45;line common-operate">
        <grid-item :to="{ path: 'create' }" title="发表主题" iconName="write" className="cyan"/>
        <grid-item href="http://www.baidu.com" title="我的信息" iconName="comment" className="blue-light"/>
        <grid-item title="最新发布" iconName="send" className="orange"/>
      </grids>
      <grids class="grids&#45;&#45;line common-operate">
        <grid-item title="发表主题" iconName="write" className="cyan"/>
        <grid-item title="我的信息" iconName="comment" className="blue-light"/>
        <grid-item title="最新发布" iconName="send" className="orange"/>
      </grids>
    </panel-simple>-->

    <!--<panel-simple title="基本使用 - 单行">
      <grids class="grids&#45;&#45;line common-operate">
        <grid-item title="发表主题" iconName="write" className="cyan"/>
        <grid-item title="我的信息" iconName="comment" className="blue-light"/>
        <grid-item title="最新发布" iconName="send" className="orange"/>
      </grids>
    </panel-simple>-->

    <!--<panel-simple title="无边框">
      <grids class="common-operate">
        <grid-item title="发表主题" iconName="write" className="cyan"/>
        <grid-item title="我的信息" iconName="comment" className="blue-light"/>
        <grid-item title="最新发布" iconName="send" className="orange"/>
      </grids>
    </panel-simple>-->

    <panel-simple>
      <grids class="common-operate">
        <grid-item class="grid__item--line" title="发表主题" iconName="write" className="cyan"/>
        <grid-item class="grid__item--line" title="我的信息" iconName="comment" className="blue-light">
          <badge float :text="100" :overflowCount="9" slot="icon">
            <i class="icon iconfont icon-comment"></i>
          </badge>
        </grid-item>
        <grid-item class="grid__item--line" title="最新发布" iconName="send" className="orange"/>
      </grids>
    </panel-simple>

    <panel-simple inside whiteSpace  title="徽标数">
      <badge float text="3" style="margin-right: 0.5rem;">
        <a href="javascript:;" style="width: 0.7rem; height: 0.7rem; background: #eee; border-radius: 6px; display: inline-block;"></a>
      </badge>

      <badge float dot style="margin-right: 0.5rem;">
        <a href="javascript:;" style="width: 0.7rem; height: 0.7rem; background: #eee; border-radius: 6px; display: inline-block;"></a>
      </badge>

      <badge float dot style="margin-right: 0.5rem;">
        <i class="icon iconfont icon-message" style="font-size: 0.8rem; color: #ccc;"></i>
      </badge>

      <badge float dot style="margin-right: 0.5rem;">
        <a href="javascript:;">可以是一个链接</a>
      </badge>

      <badge :text="1000"></badge>
    </panel-simple>

    <panel-simple title="有图标">
      <list-menu line >
        <list-menu-item iconName="collection">
          <div slot="title">
            <span>我的收藏</span>
            <badge :text="1000"></badge>
          </div>
        </list-menu-item>

        <list-menu-item hasThumb>
          <img slot="thumb" src="../../assets/i-setting.png" />
          <div slot="title">
            <span>个人资料</span><badge :text="6"></badge>
          </div>
          <div slot="extra">
            <span>简介</span><badge dot></badge>
          </div>
        </list-menu-item>

        <list-menu-item hasThumb>
          <img slot="thumb" src="../../assets/i-mihome.png" />
          <div slot="title">
            <span>最新信息</span><badge dot></badge>
          </div>
          <span slot="extra">简介</span>
        </list-menu-item>

        <list-menu-item hasThumb>
          <img slot="thumb" src="../../assets/i-setting.png" />
          <div slot="title">
            <span>圆角</span>
            <badge :text="6"></badge>
            <badge text="减" primary></badge>
            <badge text="优" secondary></badge>
            <badge text="HOT"></badge>
          </div>
          <badge slot="extra" dot></badge>
        </list-menu-item>

        <list-menu-item hasThumb>
          <img slot="thumb" src="../../assets/i-mihome.png" />
          <div slot="title">
            <span>非圆角</span>
            <badge :text="6" radius></badge>
            <badge text="券" primary radius></badge>
            <badge text="NEW" secondary radius></badge>
            <badge text="自动缴费" radius></badge>
          </div>
          <badge slot="extra" dot></badge>
        </list-menu-item>

        <list-menu-item hasThumb>
          <img slot="thumb" src="../../assets/i-setting.png" />
          <div slot="title">
            <span>透明</span>
            <badge :text="6" transparent></badge>
            <badge text="券" transparent primary radius></badge>
            <badge text="NEW" transparent secondary radius></badge>
            <badge text="自动缴费" transparent radius></badge>
          </div>
          <badge slot="extra" dot></badge>
        </list-menu-item>

        <list-menu-item title="意见反馈" brief="去 GitHub 上提交 Issues" hasThumb>
          <img slot="thumb" src="../../assets/i-mihome.png" />
          <badge slot="extra" :text="1000"></badge>
        </list-menu-item>

        <list-menu-item title="不可使用" brief="禁用项" disabled hasThumb>
          <span slot="extra">禁用项</span>
          <img slot="thumb" src="../../assets/i-mihome.png" />
        </list-menu-item>

        <list-menu-item :border="false" hasThumb>
          <img slot="thumb" src="../../assets/i-setting.png" />
          <div slot="title">多行模式，文字超长则换行；文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</div>
          <span slot="extra">1.0.0</span>
        </list-menu-item>
      </list-menu>
    </panel-simple>

  </div>
</template>

<script>
import { PanelSimple } from '@/components/panel';
import Badge from '@/components/badge';
import { Grids, GridItem } from '@/components/grids';
import { ListMenu, ListMenuItem } from '@/components/lists';

export default {
  name: 'user-menu',
  data() {
    return {
    };
  },
  components: {
    PanelSimple, Badge, Grids, GridItem, ListMenu, ListMenuItem,
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 会员
.user-header {
  padding: px2rem(80px) px2rem(40px);
  text-align: center;
  color: $primary-section-text-color-base;
  background-color: $primary-section-background-color;

  a {
    display: block;
    color: $primary-section-text-color-base;
  }

  .user-avatar {
    width: px2rem(150px);
    height: px2rem(150px);
    margin: 0 auto;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .user-name {
    margin-top: px2rem(30px);
  }
}

// 常用操作
.common-operate {
  .grid__icon {
    &.cyan {
      color: #1ca78e;
    }
    &.blue-light {
      color: #8fa2ef;
    }
    &.orange {
      color: #ff6600;
    }
  }
}
</style>
