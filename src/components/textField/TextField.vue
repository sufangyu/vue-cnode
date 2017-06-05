<template>
  <div class="text-field" :class="textFieldClassName">
    <text-field-label v-if="label" :text="label" :float="float" :focus="focus"></text-field-label>
    <div class="text-field__content">
      <text-field-hint v-if="hintShow" :text="hintText" :show="hintShow"></text-field-hint>

      <input class="text-field__input"
         v-if="!multiLine" :type="type" :value="inputValue" :disabled="disabled"
         @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange"
      />

      <textarea class="text-field__input text-field__textarea"
         v-if="multiLine" :value="inputValue" :disabled="disabled"
         @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange"
      ></textarea>
    </div>
    <div class="text-field__help" v-if="errorText || helpText || maxLength > 0">
      <div class="text-field__help__text">{{errorText || helpText}}</div>
      <div class="text-field__help__limit" v-if="maxLength > 0">{{ charLength }}/{{ maxLength }}</div>
    </div>
  </div>
</template>

<script>
import TextFieldLabel from './TextFieldLabel';
import TextFieldHint from './TextFieldHint';

export default {
  name: 'text-field',
  props: {
    // 是否被禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 错误信息
    errorText: {
      type: String,
      default: '',
    },
    // 提示文字
    hintText: {
      type: String,
      default: '',
    },
    // 帮助信息
    helpText: {
      type: String,
      default: '',
    },
    // 标签
    label: {
      type: String,
      default: '',
    },
    // 标签是否浮动
    labelFloat: {
      type: Boolean,
      default: false,
    },
    // 是否为多行输入
    multiLine: {
      type: Boolean,
      default: false,
    },
    // 可输入内容的最大长度
    maxLength: {
      type: Number,
      default: 0,
    },
    // 输入框类型
    type: {
      type: String,
    },
    // 输入框的值
    value: {
    },
  },
  data() {
    return {
      focus: false,     // 是否获取焦点
      inputValue: this.value,  // 本框内容
      fixed: !this.labelFloat, // 标签初始化时, 是否固定位置
    };
  },
  computed: {
    // 文本框内容长度
    charLength() {
      return this.inputValue ? this.inputValue.length : 0;
    },
    // 文本框的 class
    textFieldClassName() {
      return {
        'text-field__label--has': this.label,
        'state--focus': this.focus,
        'state--error': this.errorText,
        'state--disabled': this.disabled,
      };
    },
    // 标签是否浮动
    float() {
      // 不可浮动
      if (this.fixed) {
        return true;
      }

      // 可以浮动
      if (!this.focus) {
        return !!this.inputValue;
      }
      return true;
    },
    // 提示内容是否显示
    hintShow() {
      // 没有标签: 没有内容 =>> 显示; 有内容 =>> 隐藏;
      if (!this.label) {
        return !this.inputValue;
      }
      // 有内容不显示
      if (this.inputValue) {
        return false;
      }
      // 浮动 =>> 显示; 不浮动 =>> 隐藏;
      return this.float;
    },
  },
  methods: {
    // 失去焦点
    handleBlur(event) {
      this.focus = false;
      this.$emit('blur', event);
    },
    // 改变值
    handleChange(event) {
      this.$emit('change', event.target.value, event);
    },
    // 获取焦点触发
    handleFocus(event) {
      this.focus = true;
      this.$emit('focus', event);
    },
    // 输入
    handleInput(event) {
      this.inputValue = event.target ? event.target.value : event;
      this.$emit('input', event.target.value, event);
    },
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    // 输入的值
    inputValue() {
      const sInputValue = String(this.inputValue);
      this.charLength = this.maxLength && sInputValue ? sInputValue.length : 0;
    },
    // 当前输入内容的长度
    charLength(val) {
      // 超过最大长度 并且 没有已经触发超过事件 =>> 触发超过事件; 增加已触发事件的标记
      if (val > this.maxLength && !this.isTextOverflow) {
        this.isTextOverflow = true;
        this.$emit('textOverflow', true);
        this.$emit('text-overflow', true);
      }
      // 已经触发超过事件 并且 未超过最大长度 =>> 触发超过事件; 取消已触发事件的标记
      if (this.isTextOverflow && val <= this.maxLength) {
        this.isTextOverflow = false;
        this.$emit('textOverflow', false);
        this.$emit('text-overflow', false);
      }
    },
  },
  components: {
    TextFieldLabel, TextFieldHint,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 文本框
.text-field {
  margin-bottom: px2rem(60px);
  position: relative;
  color: $text-field-color-normal;

  // 有标签
  &__label--has {
    padding-top: px2rem(30px);
  }

  // focus 状态
  &.state--focus {
    color: $text-field-color-focus;

    .text-field__content {
      border-color: $text-field-color-focus;

      &:after {
        border-color: $text-field-color-focus;
      }
    }
  }

  // error 状态
  &.state--error {
    color: $text-field-color-error;

    .text-field__content {
      border-color: $text-field-color-error;

      &:after {
        border-color: $text-field-color-error;
      }
    }
  }

  // disabled 状态
  &.state--disabled {
    color: $text-field-color-disabled;

    .text-field__hint {
      color: inherit;
    }

    .text-field__input {
      color: inherit;
      cursor: not-allowed;
    }

    .text-field__content {
      border-bottom: 1px dotted transparent;

      &:after {
        border-bottom: 2px dotted $text-field-input-border-color;
      }
    }
  }
}

.text-field__content {
  position: relative;
  padding-top: px2rem(4px);
  border-bottom: 1px solid $text-field-input-border-color;
  transition: border .25s;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid transparent;
    transition: border .25s;
  }
}

// 文本框
.text-field__input {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: block;
  width: 100%;
  height: $text-field-input-size;
  color: rgba(0,0,0,0.87);
}

// 文本区域
.text-field__textarea {
  resize: none;
  min-height: px2rem(160px);
  max-height: px2rem(360px);
  line-height: 1.4;
}

// 提示信息
.text-field__help {
  position: absolute;
  left: 0;
  right: 0;
  bottom: px2rem(-36px);
  width: 100%;
  font-size: $text-field-font-size-help;
  display: flex;
  justify-content: space-between;
}
// 错误提示信息
.text-field__help--info {
}
</style>
