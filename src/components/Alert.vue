<template>
  <div :class="className">
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue/dist/vue.js'
import { defineComponent } from 'vue'

const classNames = {
  default: '',
  primary: 'alert_kind-primary',
  secondary: 'alert_kind-secondary',
  success: 'alert_kind-success',
  danger: 'alert_kind-danger',
  warning: 'alert_kind-warning',
}

export default defineComponent({
  name: 'Alert',
  props: {
    kind: {
      type: String as PropType<keyof typeof classNames>,
      default: 'default',
    },
  },
  setup (props) {
    return {
      className: [
        'alert',
        classNames[props.kind],
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "~@/styles/_variables.scss";

.alert {
  border: 1px solid grey;
  border-radius: $border-radius;
  background-color: #fff;
  padding: 16px 12px;
  width: 100%;
}

.alert_kind {
  @each $name, $settings in $colors {
    &-#{$name} {
      $bg: map.get($settings, "background");
      background-color: lighten($bg, 20%);
      color: invert(map.get($settings, "text"));
      border-color: darken($bg, 10%)
    }
  }
}
</style>
