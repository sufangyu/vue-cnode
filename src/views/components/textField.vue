<template>
  <div class="page page-components">
    <panel-simple title="标签固定不浮动" wingBlank whiteSpace>
      <text-field
        label="姓名"
        hintText="请输入姓名"
      >
      </text-field>
      <text-field
        label="地址"
        hintText="请输入地址"
        v-model="value"
      >
      </text-field>
      <text-field
        label="密码"
        hintText="请输入密码"
        type="password"
      >
      </text-field>
      <text-field
        label="确认密码"
        hintText="请再次输入密码"
        type="password"
      >
      </text-field>
      <text-field
        label="简介"
        hintText="请填写个人简单介绍"
        multiLine
      >
      </text-field>
    </panel-simple>

    <panel-simple title="获取焦点时, 标签浮动" wingBlank whiteSpace>
      <text-field
        label="姓名"
        hintText="请输入姓名"
        labelFloat
      >
      </text-field>
      <text-field
        label="地址"
        hintText="请输入地址"
        labelFloat
        v-model="value"
      >
      </text-field>
      <text-field
        label="密码"
        hintText="请输入密码"
        type="password"
        labelFloat
      >
      </text-field>
      <text-field
        label="确认密码"
        hintText="请再次输入密码"
        type="password"
        labelFloat
      >
      </text-field>
      <text-field
        label="简介"
        hintText="请填写个人简单介绍"
        labelFloat
        multiLine
      >
      </text-field>
    </panel-simple>

    <panel-simple title="没有标签" wingBlank whiteSpace>
      <text-field
        hintText="请输入姓名"
      >
      </text-field>
      <text-field
        hintText="请输入地址"
        v-model="value"
      >
      </text-field>
      <text-field
        hintText="请输入密码"
      >
      </text-field>
      <text-field
        hintText="请再次输入密码"
      >
      </text-field>
      <text-field
        hintText="请填写个人简单介绍"
        multiLine
      >
      </text-field>
    </panel-simple>

    <panel-simple title="限制输入字数" wingBlank whiteSpace>
      <text-field
        label="姓名"
        hintText="请输入姓名"
        :maxLength="10"
        :errorText="inputErrorText"
        @textOverflow="handleInputOverflow"
      >
      </text-field>
      <text-field
        label="地址"
        hintText="请输入地址"
        v-model="value"
        :maxLength="10"
        :errorText="inputErrorTextDefault"
        @textOverflow="handleInputOverflowDefault"
      >
      </text-field>
      <text-field
        label="简介"
        hintText="请填写个人简单介绍"
        multiLine
        :maxLength="100"
        :errorText="multiLineInputErrorText"
        @textOverflow="handleMultiLineOverflow"
      >
      </text-field>
    </panel-simple>

    <panel-simple title="被禁用" wingBlank whiteSpace>
      <text-field
        label="标签"
        hintText="固定标签 - 被禁用"
        disabled
      >
      </text-field>
      <text-field
        hintText="没有标签 - 被禁用"
        disabled
      >
      </text-field>
      <text-field
        label="标签"
        hintText="浮动标签 - 被禁用"
        labelFloat
        disabled
      >
      </text-field>
      <text-field
        label="地址"
        hintText="请输入地址"
        value="默认值 - 被禁用"
        disabled
      >
      </text-field>
      <text-field
        hintText="没有标签 - 被禁用"
        disabled
      >
      </text-field>
      <text-field
        label="多行内容 - 被禁用"
        hintText="请填写个人简单介绍"
        multiLine
        disabled
      >
      </text-field>
    </panel-simple>

    <panel-simple title="事件监听" wingBlank whiteSpace>
      <text-field
        label="姓名"
        hintText="请输入姓名"
        :maxLength="10"
        :errorText="inputErrorTextEventHandle"
        @textOverflow="handleInputOverflowEventHandle"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @input="handleInput"
      >
      </text-field>
    </panel-simple>
  </div>
</template>

<script>
import TextField from '@/components/textField';
import { PanelSimple } from '@/components/panel';

export default {
  name: 'c-text-field',
  components: {
    PanelSimple, TextField,
  },
  data() {
    return {
      value: '广东省广州市',
      inputErrorText: '',
      inputErrorTextDefault: '',
      multiLineInputErrorText: '',
      inputErrorTextEventHandle: '',
    };
  },
  methods: {
    handleInputOverflow(isOverflow) {
      this.inputErrorText = isOverflow ? '超过了！超过了！' : '';
    },
    handleInputOverflowDefault(isOverflow) {
      this.inputErrorTextDefault = isOverflow ? '地址超过了10个字符' : '';
    },
    handleMultiLineOverflow(isOverflow) {
      this.multiLineInputErrorText = isOverflow ? '超过100个字了！！！！' : '';
    },

    handleInputOverflowEventHandle(isOverflow) {
      this.inputErrorTextEventHandle = isOverflow ? '事件监听之字数超了' : '';
    },
    handleFocus(event) {
      console.log('获取到焦点 =>>', event);
    },
    handleBlur(event) {
      console.log('失去焦点 =>>', event);
    },
    handleChange(event, value) {
      console.log('值改变 =>>', value);
    },
    handleInput(event, value) {
      console.log('有输入内容 =>>', value);
    },
  },
};
</script>
