<template>
  <div class="nav-category">
    <div class="nav-category__scroll">
      <slot name="scroll-content">
        <ul>
          <li v-for="(item, index) in categories">
            <abstract-item
              :class="{ 'active': item.tabValue === currentTabValue }"
              :key="index"
              :href="item.href"
              :target="item.target"
              :to="item.to"
              :tag="tag"
              :append="item.append"
              :replace="item.replace"
              :exact="item.exact"
              @click.native="itemClickHandler(index, item.tabValue, $event)"
            >
              {{ item.name }}
            </abstract-Item>
          </li>
        </ul>
      </slot>
    </div>

    <div class="toggle-all__button"
       :class="{ 'active': showAll }"
       @click="toggleHandler"
    >
      <Icon value="arrow-down" size="xs"/>
    </div>

    <div class="nav-category__all" :class="{ 'active': showAll }">
      <div class="nav-category__all__overlay"
         @click="hideCategoryAll"
         @touchmove.prevent
      >
      </div>

      <div class="nav-category__all__wrapper">
        <h3 class="nav-category__all__title">切换栏目</h3>
        <slot name="all-content">
          <ul class="nav-category__all__content">
            <li v-for="(item, index) in categories">
              <abstract-item
                :href="item.href"
                :target="item.target"
                :tag="tag"
                :to="item.to"
                :tabValue="item.tabValue"
                :append="item.append"
                :replace="item.replace"
                :exact="item.exact"
                @click.native="itemClickHandler(index, item.tabValue, $event)"
              >
                {{ item.name }}
              </abstract-item>
            </li>
          </ul>
          <div class="nav-category__all__editor" v-show="editText">{{ editText }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon';
import AbstractItem from './AbstractItem';

export default {
  name: 'nav-category',
  props: {
    // 类别列表
    categories: {
      type: Array,
    },
    // 编辑说明文字
    editText: {
      type: String,
      default: '',
    },
    // 是否显示全部类别
    show: {
      type: Boolean,
      default: false,
    },
    // 路由标签
    tag: {
      type: String,
      default: 'a',
    },
  },
  data() {
    return {
      showAll: this.show,
      currentTabValue: this.categories[0].tabValue,
    };
  },
  components: {
    Icon, AbstractItem,
  },
  methods: {
    // 显示/隐藏全部类别切换
    toggleHandler() {
      this.showAll = !this.showAll;
    },
    // 隐藏全部类别切换
    hideCategoryAll() {
      this.showAll = false;
    },
    // 类别单项点击
    itemClickHandler(index, tabValue, event) {
      this.showAll = false;
      this.currentTabValue = tabValue;
      this.$emit('itemClick', index, tabValue, event);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.nav-category {
  position: relative;
  color: $nav-category-scroll-text-color;

  // 滚动栏目内容
  &__scroll {
    position: relative;
    height: $nav-category-size-height;
    background-color: $nav-category-scroll-background-color;
    padding: 0 px2rem(100px) 0 px2rem(40px);

    &:after {
      content: "";
      display: block;
      position: absolute;
      right: px2rem(100px);
      top: 0;
      width: px2rem(40px);
      height: $nav-category-size-height;
      z-index: 1;
      background-image: linear-gradient(to left, $nav-category-scroll-background-color 0, rgba(0,0,0,0) 100%);
    }

    ul {
      position: relative;
      height: 100%;
      overflow-x: auto;
      white-space: nowrap;
      font-size: 0;
      -webkit-overflow-scrolling: touch;
    }
    li {
      display: inline-block;
      font-size: px2rem(32px);

      > a,
      > div {
        display: block;
        height: $nav-category-size-height;
        line-height: $nav-category-size-height;
        padding: 0 px2rem(40px);
        color: inherit;
        font-size: px2rem(32px);
        opacity: 0.6;
        transition: opacity 0.2s;
        cursor: pointer;

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .toggle-all__button {
    position: absolute;
    top: px2rem(26px);
    right: px2rem(30px);
    z-index: $zindex-dropdown;
    opacity: 0.6;
    transition: transform .25s;
    cursor: pointer;

    &.active {
      transform: rotate(-180deg);
    }

  }

  // 全部栏目内容
  &__all {

    a {
      color: inherit;
    }

    &__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: $zindex-modal;
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      transition: opacity .25s;
      opacity: 0;
      visibility: hidden;
    }

    // 显示
    &.active {
      .nav-category__all__wrapper {
        transform: translateY(0);
      }

      .nav-category__all__overlay {
        opacity: 1;
        visibility: visible;
      }
    }

    &__wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: $zindex-modal;
      color: $nav-category-scroll-text-color;
      background-color: $nav-category-scroll-background-color;
      transform: translateY(-100%);
      transition: opacity .3s, transform .45s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &__title {
      padding: 0 px2rem(40px);
      font-size: px2rem(32px);
      height: $nav-category-size-height;
      line-height: $nav-category-size-height;
      opacity: 0.8;
    }

    &__content {
      overflow: hidden;

      li {
        width: 25%;
        float: left;
        margin: px2rem(16px) 0;
        text-align: center;

        > a,
        > div {
          display: block;
          padding: px2rem(20px) 0;
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }

    &__editor {
      border-top: 1px solid $nav-category-border-color;
      padding: px2rem(30px) 0;
      text-align: center;
    }
  }
}
</style>
