<template>
  <div class="page page-components">
    <panel-simple title="类型" wingBlank whiteSpace>
      <p>
        <loader type="throb"/>
        <loader type="oval"/>
        <loader type="tail"/>
      </p>
    </panel-simple>


    <panel-simple title="尺寸" wingBlank whiteSpace>
      <p>
        <loader size="xs"/>
        <loader size="sm"/>
        <loader size="md"/>
        <loader size="lg"/>
      </p>
    </panel-simple>

    <panel-simple title="颜色" wingBlank whiteSpace>
      <loader color="red"/>
      <loader color="yellow"/>
      <loader color="blue"/>
      <loader color="green"/>
    </panel-simple>
  </div>
</template>

<script>
import Loader from '@/components/loader';
import { PanelSimple } from '@/components/panel';

export default {
  name: 'c-circular',
  components: {
    Loader, PanelSimple,
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/import";

</style>
