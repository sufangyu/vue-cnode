<template>
  <div class="divider" :class="spaceClass">
    <span class="divider__label" v-if="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'divider',
  props: {
    label: {
      type: String,
    },
    space: {
      type: String,  // sm, md, lg
    },
  },
  computed: {
    spaceClass() {
      return this.space === '' ? '' : `divider--space-${this.space}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../style/import";

.divider {
  position: relative;
  border-top: 1px solid $divider-line-color;
  text-align: center;
  color:$divider-text-color;

  &__label {
    position: absolute;
    top: -0.5em;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 1em;
    background-color: $divider-background-color;
    color: $divider-text-color;
  }

  &--space {
    &-sm {
      margin-top: $divider-space-sm ;
      margin-bottom: $divider-space-sm ;
    }
    &-md {
      margin-top: $divider-space-md ;
      margin-bottom: $divider-space-md ;
    }
    &-lg {
      margin-top: $divider-space-lg ;
      margin-bottom: $divider-space-lg ;
    }
  }
}
</style>
