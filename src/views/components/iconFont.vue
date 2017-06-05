<template>
  <div class="page page-components">
    <panel-simple title="尺寸" wingBlank whiteSpace>
      <p>
        <icon value="message" size="xxs"/>
        <icon value="message" size="xs"/>
        <icon value="message" size="sm"/>
        <icon value="message" size="md"/>
        <icon value="message" size="lg"/>
      </p>
      <p>
        <icon value="home" :size="24"/>
        <icon value="home" :size="48"/>
        <icon value="home" :size="72"/>
        <icon value="home" :size="96"/>
        <icon value="home" :size="120"/>
      </p>
      <p>
        <icon value="home" sizeUnit='px' :size="24"/>
        <icon value="home" sizeUnit='px' :size="48"/>
        <icon value="home" sizeUnit='px' :size="72"/>
        <icon value="home" sizeUnit='px' :size="96"/>
        <icon value="home" sizeUnit='px' :size="120"/>
      </p>
    </panel-simple>

    <panel-simple title="颜色" wingBlank whiteSpace>
      <p>
        <icon value="home" color="redA200"/>
        <icon value="home" color="blue"/>
        <icon value="home" color="orange"/>
        <icon value="home" color="pink"/>
        <icon value="home" color="grey"/>
      </p>
    </panel-simple>

    <panel-simple title="全部" wingBlank whiteSpace>
      <div class="icons">
        <div class="icon__item">
          <icon value="home"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="home-fill"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="message"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="message-fill"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="user"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="user-fill"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="component"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="component-fill"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="radio-unchecked"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="radio-checked-fill"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="checkbox-unchecked"/>
          <div class="icon__item__name">home</div>
        </div>
        <div class="icon__item">
          <icon value="checkbox-checked-fill"/>
          <div class="icon__item__name">home</div>
        </div>
      </div>
    </panel-simple>

  </div>
</template>

<script>
import Icon from '@/components/icon';
import { PanelSimple } from '@/components/panel';

export default {
  name: 'c-icon-font',
  components: {
    Icon, PanelSimple,
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/import";

p {
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.icon__item {
  flex: 1;
  min-width: 24%;
  padding: px2rem(30px) 0;
  text-align: center;
  background-color: rgba(0,0,0,0.02);
  margin: 0.5%;

  &__name {
    color: $grey;
    font-size: px2rem(28px);
    margin-top: px2rem(20px);
  }

  .iconfont {
    color: $grey700;
    background-color: rgba(0,0,0,0.1);
  }
}
</style>
