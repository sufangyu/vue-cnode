<template>
  <div class="page page-components">
    <panel-simple title="常规" wingBlank whiteSpace>
      <checkbox class="demo-checkbox" label="最简单的"/><br />
      <checkbox class="demo-checkbox" label="自定义icon" uncheckIcon="message" checkIcon="message-fill"/><br />
      <checkbox class="demo-checkbox" label="不同图形的icon" uncheckIcon="user" checkIcon="user-fill"/><br />
      <checkbox class="demo-checkbox" label="文字在左边的" labelLeft/><br />
    </panel-simple>

    <panel-simple title="禁用状态" wingBlank whiteSpace>
      <checkbox class="demo-checkbox" label="默认" disabled/><br />
      <checkbox class="demo-checkbox" label="默认" disabled :value="true"/><br />
      <checkbox class="demo-checkbox" label="自定义ICON" disabled uncheckIcon="message" checkIcon="message-fill"/><br />
      <checkbox class="demo-checkbox" label="自定义ICON" disabled uncheckIcon="message" checkIcon="message-fill" :value="true" /><br />
      <checkbox class="demo-checkbox" label="文字在左边" labelLeft disabled/><br />
      <checkbox class="demo-checkbox" label="文字在左边" labelLeft disabled :value="true"/><br />
    </panel-simple>

    <panel-simple title="显示结果" wingBlank whiteSpace>
      <checkbox class="demo-checkbox" name="group" v-model="list" value="checkbox111" nativeValue="checkbox1" label="选项 1"/><br />
      <checkbox class="demo-checkbox" name="group" v-model="list" value="checkbox222" nativeValue="checkbox2" label="选项 2"/><br />
      <checkbox class="demo-checkbox" name="group" v-model="list" value="checkbox333" nativeValue="checkbox3" label="选项 3"/><br />
      <div class="demo-checkbox">你选择的是：{{ list }}</div>

      <checkbox :label="single ? 'true' : 'false'" v-model="single"/>
    </panel-simple>
  </div>
</template>

<script>
import Checkbox from '@/components/checkbox';
import { PanelSimple } from '@/components/panel';

export default {
  name: 'c-checkbox',
  data() {
    return {
      list: [],
      single: false,
    };
  },
  components: {
    Checkbox, PanelSimple,
  },
};
</script>

<style>
.demo-checkbox {
  margin-bottom: 0.25rem;
}
</style>
