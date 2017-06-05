<template>
  <div class="topic-form">
    <div class="form-group">
      <div class="form-label"><label for="tab">类别</label></div>
      <div class="select">
        <div class="select__selection"
           @click.stop="showSelectDropDown"
        >
          <span class="select__placeholder" v-if="!topicTab">请选择类别</span>
          <span class="select__value" v-if="topicTab">{{ topicTabLabel }}</span>
          <icon class="select__arrow"
            value="arrow-down-fill"
            size="xs"
            color="grey400"
          />
        </div>
        <transition name="dropdown">
          <div class="select__dropdown" ref="popup" v-show="open">
            <div class="select__dropdown__list">
              <div class="select__option"
                v-for="(item, index) in topicTabs"
                key="index"
                :class="{ 'selected': topicTab === item.value }"
                @click="selectTopicTab(item.value, item.label)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="form-group">
      <div class="form-label"><label for="title">标题</label></div>
      <div>
        <input
          type="text"
          class="form-input"
          placeholder="请输入标题"
          :value="topicTitle"
          @input="handleInputTitle"
          @change="handleChangeTitle"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="form-label"><label for="content">内容</label></div>
      <div>
        <markdown-editor
          ref="markdownEditor"
          preview-class="markdown-body"
          :configs="configs"
          :custom-theme="true"
          :initialValue="topicContent"
          :value="topicContent"
          @input="handleInputContent"
          @change="handleChangeContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon';
import { markdownEditor } from 'vue-simplemde';

export default {
  name: 'topic-edit',
  props: {
    tab: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  data() {
    return {
      topicTabTemp: '',  // 暂存的 tab
      topicTabLabel: '',
      topicTabs: [
        {
          label: '问答',
          value: 'ask',
        },
        {
          label: '分享',
          value: 'share',
        },
        {
          label: '招聘',
          value: 'job',
        },
        {
          label: '测试发表',
          value: 'dev',
        },
      ],
      open: false,
      configs: {
        status: false, // 禁用底部状态栏
        spellChecker: false, // 禁用拼写检查
      },
    };
  },
  computed: {
    topicTab() {
      return this.topicTabTemp;
    },
    topicTitle() {
      return this.title;
    },
    topicContent() {
      return this.content;
    },
  },
  components: {
    Icon, markdownEditor,
  },
  watch: {
    // 监听 tab, 发生改变, 则复制给暂存的 tab. 用于解决请求数据后再赋值无法成功情况
    tab: function tab(newVal) {
      this.topicTabTemp = newVal;
      this.setTopicTabLabel(newVal);
    },
  },
  methods: {
    // 隐藏下拉选择
    hideSelectDropDown() {
      this.open = false;
    },
    // 显示下拉选择
    showSelectDropDown() {
      this.open = !this.open;

      // 定义关闭函数, 并且绑定到 document
      const bindClose = (ev) => {
        ev.stopPropagation();
        this.hideSelectDropDown();
        document.removeEventListener('click', bindClose, false);
      };
      document.addEventListener('click', bindClose, false);
    },
    // 标题改变值
    handleChangeTitle(event) {
      this.$emit('changeTitle', event.target.value, event);
    },
    // 标题输入
    handleInputTitle(event) {
      this.$emit('inputTitle', event.target.value, event);
    },
    // 内容改变值
    handleChangeContent(event) {
      this.$emit('changeContent', event.target.value, event);
    },
    // 内容输入
    handleInputContent(value) {
      this.$emit('inputContent', value, event);
    },
    // 选择主题类别
    selectTopicTab(value, label) {
      if (this.topicTab === value) {
        this.topicTab = '';
        this.topicTabTemp = '';
        this.topicTabLabel = '';
      } else {
        this.topicTab = value;
        this.topicTabTemp = value;
        this.topicTabLabel = label;
      }
      this.$emit('selectTab', this.topicTab);
    },
    // 设置主题类别名称
    setTopicTabLabel(topicTab) {
      this.topicTabs.forEach((item) => {
        if (item.value === topicTab) {
          this.topicTabLabel = item.label;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";
@import "../../style/markdownEditor";

.topic-form {
  padding: px2rem(30px);
  min-height: calc(100vh - 1.3rem);

  .text-field__textarea {
    min-height: calc(50vh);
  }
}

.form-group {
  margin-bottom: px2rem(40px);
}

.form-label {
  font-size: px2rem(20px);
  color: $grey500;
  margin-bottom: px2rem(14px);
}

.form-select,
.form-input {
  padding: 0;
  border: none;
  display: block;
  width: 100%;
  height: px2rem(80px);
  font-size: px2rem(30px);
  line-height: 1.42857143;
  color: #555;
  background-image: none;
  border-bottom: 1px solid #ccc;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;

  option {
    font-size: px2rem(28px) !important;
    padding: 0 !important;
    margin: 0 !important;
    transform: scale(0.2);
  }
}

$selection-size  : 80px;
$dropdown-top    : $selection-size - 2px;

.select {
  position: relative;
  font-size: px2rem(30px);

  &__selection {
    position: relative;
    color: $grey600;
    border-bottom: 1px solid #ccc;
    height: px2rem($selection-size);
    line-height: px2rem($selection-size);
  }

  &__placeholder {
    opacity: 0.6;
  }

  &__arrow {
    position: absolute;
    top: px2rem(16px);
    right: px2rem(16px);
  }

  // 下拉选项
  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem($dropdown-top);
    z-index: $zindex-dropdown;
    max-height: px2rem(400px);
    font-size: 0.95em;
    background-color: $white;
    overflow: visible;
    border-radius: px2rem(6px);
    box-shadow: 0 px2rem(2px) px2rem(12px) rgba(0,0,0, 0.12), 0 px2rem(2px) px2rem(8px) rgba(0,0,0, 0.12);
    transform-origin: center top;
    -webkit-overflow-scrolling: touch;

    // 列表
    &__list {
      padding: px2rem(10px) 0;
    }
  }
}
// 单项选择
.select__option {
  padding: px2rem(30px) px2rem(20px);
  cursor: pointer;
  transition: background .2s ease-in-out;
  color: $grey500;

  &:hover {
    background-color: $grey200;
  }

  &.selected {
    color: $primary-color;
  }
}

.dropdown {
  &-enter-active,
  &-leave-active {
    transition-duration: .3s;
    transition-property: opacity, transform;
  }
  &-enter,
  &-leave-active {
    transform: scaleY(0);
    opacity: 0;
  }
}
</style>
