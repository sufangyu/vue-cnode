<template>
  <div class="page page-components">
    <panel-simple title="链接型" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="默认" />
        <yu-button label="主要" primary/>
        <yu-button label="辅助" secondary/>
        <yu-button label="禁用" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="扁平型" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="默认" type="flat"/>
        <yu-button label="主要" type="flat" primary/>
        <yu-button label="辅助" type="flat" secondary/>
        <yu-button label="禁用" type="flat" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="幽灵型" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="默认" type="ghost"/>
        <yu-button label="主要" type="ghost" primary/>
        <yu-button label="辅助" type="ghost" secondary/>
        <yu-button label="禁用" type="ghost" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="图标" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button icon="message" label="链接"/>
        <yu-button icon="message" label="链接" primary/>
        <yu-button icon="message" label="链接" secondary/>
        <yu-button icon="message" label="链接" disabled/>
      </div>
      <div class="button-demo">
        <yu-button icon="message" label="扁平" type="flat"/>
        <yu-button icon="message" label="扁平" type="flat" primary/>
        <yu-button icon="message" label="扁平" type="flat" secondary/>
        <yu-button icon="message" label="扁平" type="flat" disabled/>
      </div>
      <div class="button-demo">
        <yu-button icon="message" label="幽灵" type="ghost"/>
        <yu-button icon="message" label="幽灵" type="ghost" primary/>
        <yu-button icon="message" label="幽灵" type="ghost" secondary/>
        <yu-button icon="message" label="幽灵" type="ghost" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="投影" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="链接" shadow/>
        <yu-button label="链接" primary shadow/>
        <yu-button label="链接" secondary shadow/>
        <yu-button label="链接" disabled shadow/>
      </div>
      <div class="button-demo">
        <yu-button label="扁平" type="flat" shadow/>
        <yu-button label="扁平" type="flat" primary shadow/>
        <yu-button label="扁平" type="flat" secondary shadow/>
        <yu-button label="扁平" type="flat" disabled shadow/>
      </div>
      <div class="button-demo">
        <yu-button label="幽灵" type="ghost" shadow/>
        <yu-button label="幽灵" type="ghost" primary shadow/>
        <yu-button label="幽灵" type="ghost" secondary shadow/>
        <yu-button label="幽灵" type="ghost" disabled shadow/>
      </div>
    </panel-simple>

    <panel-simple title="半圆角" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="扁平" type="flat" radius/>
        <yu-button label="扁平" type="flat" primary radius/>
        <yu-button label="扁平" type="flat" secondary radius/>
        <yu-button label="扁平" type="flat" disabled radius/>
      </div>
      <div class="button-demo">
        <yu-button label="幽灵" type="ghost" radius/>
        <yu-button label="幽灵" type="ghost" primary radius/>
        <yu-button label="幽灵" type="ghost" secondary radius/>
        <yu-button label="幽灵" type="ghost" disabled radius/>
      </div>
    </panel-simple>

    <panel-simple title="圆形" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button icon="message" type="flat" size="lg" shadow circle/>
        <yu-button icon="message" type="flat" size="lg" primary shadow circle/>
        <yu-button icon="message" type="flat" size="lg" secondary shadow circle/>
        <yu-button icon="message" type="flat" size="lg" disabled shadow circle/>
      </div>
    </panel-simple>

    <panel-simple title="尺寸" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="主要" size="sm"/>
        <yu-button label="主要" size="md" primary/>
        <yu-button label="主要" size="lg" secondary/>
        <yu-button label="禁用" size="lg" disabled/>
      </div>
      <div class="button-demo">
        <yu-button label="主要" type="flat" size="sm"/>
        <yu-button label="主要" type="flat" size="md" primary/>
        <yu-button label="主要" type="flat" size="lg" secondary/>
        <yu-button label="禁用" type="flat" size="lg" disabled/>
      </div>
      <div class="button-demo">
        <yu-button label="主要" type="ghost" size="sm"/>
        <yu-button label="主要" type="ghost" size="md" primary/>
        <yu-button label="主要" type="ghost" size="lg" secondary/>
        <yu-button label="禁用" type="ghost" size="lg" disabled/>
      </div>
      <div class="button-demo">
        <yu-button icon="message" type="flat" size="sm" secondary shadow circle/>
        <yu-button icon="message" type="flat" size="md" secondary shadow circle/>
        <yu-button icon="message" type="flat" size="lg" secondary shadow circle/>
      </div>

    </panel-simple>

    <panel-simple title="自定义颜色" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="我的" color="grey50" backgroundColor="yellow900" />
        <yu-button label="地盘" color="grey50" backgroundColor="yellow900" primary/>
        <yu-button label="由我" color="grey50" backgroundColor="yellow900" secondary/>
        <yu-button label="做主" color="grey50" backgroundColor="yellow900" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="满屏" wingBlank whiteSpace>
      <div class="button-demo button-demo-full">
        <yu-button label="确定提交" fullWidth secondary type="flat"/>
        <yu-button label="确定删除" fullWidth secondary type="ghost"/>
      </div>
      <div class="button-demo button-demo-full">
        <yu-button label="确定提交" fullWidth secondary radius type="flat"/>
        <yu-button label="确定删除" fullWidth secondary radius type="ghost"/>
      </div>
    </panel-simple>

    <panel-simple title="不同类型标签" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button label="button 标签" type="flat" primary nativeType="submit"/>
        <yu-button label="button 标签" type="flat" primary nativeType="reset"/>
        <yu-button label="button 标签" type="flat" primary nativeType="submit" disabled/>
      </div>

      <div class="button-demo">
        <yu-button label="a 标签" type="flat" primary href="http://www.baidu.com"/>
        <yu-button label="a 标签" type="flat" primary href="http://www.baidu.com" target="_blank"/>
        <yu-button label="a 标签" type="flat" primary href="http://www.baidu.com" target="_blank" disabled/>
      </div>
    </panel-simple>

    <panel-simple title="路由功能" wingBlank whiteSpace>
      <div class="button-demo">
        <yu-button type="flat" secondary label="to" to="message"/>
        <yu-button type="flat" secondary label="query" :to="{ path: '/message', query: { tab: 'unread' } }"/>
        <yu-button type="flat" secondary label="append" to="badge" append/>
        <yu-button type="flat" secondary label="replace" to="badge" replace/>
        <yu-button type="flat" secondary label="button tag" to="badge" tag="button"/>
      </div>
    </panel-simple>

    <panel-simple title="按钮组 - 对齐" wingBlank whiteSpace>
      <div class="button-demo">
        <button-group align="left">
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>

      <div class="button-demo">
        <button-group align="center">
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>

      <div class="button-demo">
        <button-group align="right">
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>
    </panel-simple>

    <panel-simple title="按钮组 - 无间距" wingBlank whiteSpace>
      <div class="button-demo">
        <button-group align="left" collapse>
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>
      <div class="button-demo">
        <button-group align="center" collapse>
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>
      <div class="button-demo">
        <button-group align="right" collapse>
          <yu-button label="取消" type="flat"/>
          <yu-button label="确定删除" type="flat" primary/>
        </button-group>
      </div>
    </panel-simple>
    <panel-simple title="按钮组 - 尺寸" wingBlank whiteSpace>
      <div class="button-demo">
        <button-group size="lg">
          <yu-button label="删除" type="flat" primary/>
          <yu-button label="取消" type="flat" primary/>
          <yu-button label="确定" type="flat" primary/>
        </button-group>
      </div>
      <div class="button-demo">
        <button-group size="md">
          <yu-button label="删除" type="flat" primary/>
          <yu-button label="取消" type="flat" primary/>
          <yu-button label="确定" type="flat" primary/>
        </button-group>
      </div>
      <div class="button-demo">
        <button-group size="sm">
          <yu-button label="删除" type="flat" primary/>
          <yu-button label="取消" type="flat" primary/>
          <yu-button label="确定" type="flat" primary/>
        </button-group>
      </div>
    </panel-simple>
  </div>
</template>

<script>
import { ButtonGroup, Button } from '@/components/buttons';
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
    ButtonGroup,
    'yu-button': Button,
    PanelSimple,
  },
};
</script>

<style lang="scss">
.button-demo {
  margin: 0.3rem 0;
}
.button-demo-full {
  .button {
    margin: 0.1rem 0;
  }
}
h4 {
  margin-bottom: 0.3rem;
}
</style>
