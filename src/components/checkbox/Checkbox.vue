<template>
  <label class="checkbox"
   :name="name" :class="{'disabled': disabled, 'no-label': !label}">
    <input type="checkbox"
      :disabled="disabled" :name="name" :value="nativeValue" v-model="inputValue"
       @change="handleChange"
    />
    <div class="checkbox-wrapper">
      <div class="checkbox__label" v-if="label && labelLeft">{{ label }}</div>
      <div class="checkbox__icon" :class="{ 'checkbox__icon--right': labelLeft }">
        <icon class="checkbox__icon--uncheck" v-if="uncheckIcon" :value="uncheckIcon" size="xs"></icon>
        <icon class="checkbox__icon--check" v-if="checkIcon" :value="checkIcon" size="xs"></icon>
      </div>
      <div class="checkbox__label" v-if="label && !labelLeft">{{ label }}</div>
    </div>
  </label>
</template>

<script>
import Icon from '../icon';

export default {
  name: 'checkbox',
  props: {
    // 选中时图标
    checkIcon: {
      type: String,
      default: 'checkbox-checked-fill',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 标签文字
    label: {
      type: String,
      default: '',
    },
    // 标签文字是否在左边
    labelLeft: {
      type: Boolean,
      default: false,
    },
    // 相当于 input[type=checkbox] 元素的 name 属性
    name: {
      type: String,
    },
    // 相当于 input[type=checkbox] 元素的 value 属性
    nativeValue: {
      type: String,
    },
    // 未选中时图标
    uncheckIcon: {
      type: String,
      default: 'checkbox-unchecked',
    },
    // 用来使用 v-model控制
    value: {
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(val) {
      // 触发外部的 input 事件, 实现值的外传
      this.$emit('input', val);
    },
  },
  methods: {
    handleChange() {
      // 触发外部的 change 事件, 实现值的外传
      this.$emit('change', this.inputValue);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.checkbox {
  user-select: none;
  cursor: pointer;
  position: relative;
  display: inline-block;

  // 实际元素
  input[type=checkbox] {
    display: none;

    // 选中状态
    &:checked {
      + .checkbox-wrapper {
        .checkbox__icon--uncheck {
          opacity: 0;
        }

        .checkbox__icon--check {
          opacity: 1;
        }
      }
    }
  }

  // 禁用状态
  &.disabled {
    cursor: not-allowed;

    .checkbox__icon--uncheck, .checkbox__icon--check, .checkbox__label {
      color: $checkbox-checked-color-disabled;
    }
  }
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox__icon {
  width: $checkbox-checked-icon-size;
  height: $checkbox-checked-icon-size;
  vertical-align: middle;
  position: relative;
  margin-right: px2rem(20px);

  // 右边图标
  &--right {
    margin-right: 0;
    margin-left: px2rem(20px);
  }

  &--uncheck, &--check {
    position: absolute;
    top: 0;
    left: 0;
  }

  // 未选中状态
  &--uncheck {
    opacity: 1;
    transition: opacity 0.35s cubic-bezier(.23,1,.32,1);
  }
  // 选中状态
  &--check {
    color: $checkbox-checked-color;
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(.23,1,.32,1);
  }
}
</style>
