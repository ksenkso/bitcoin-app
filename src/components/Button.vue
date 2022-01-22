<template>
  <button :class="className">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

const classNames = {
  default: '',
  primary: 'button_kind-primary',
  secondary: 'button_kind-secondary',
  success: 'button_kind-success',
  danger: 'button_kind-danger',
  warning: 'button_kind-warning',
}

export default defineComponent({
  name: 'Button',
  props: {
    kind: {
      type: String as PropType<keyof typeof classNames>,
      default: 'default',
    },
  },
  setup (props) {
    return {
      className: [
        'button',
        classNames[props.kind],
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "~@/styles/_mixins.scss";
@import "~@/styles/_functions.scss";

$colors: (
  "primary": (
    "background": #476bd1,
    "text": white,
  ),
  "secondary": (
    "background": #787a87,
    "text": black,
  ),
  "success": (
    "background": #57b857,
    "text": white,
  ),
  "danger": (
    "background": #d9514c,
    "text": white,
  ),
  "warning": (
    "background": #edab43,
    "text": white,
  ),
);

@function button-shadow($color) {
  @return inset 0 0 3px 3px darken($color, 10%);
}

.button {
  display: inline-block;
  border: 1px solid grey;
  border-radius: 5px;
  cursor: pointer;
  padding: 6px 12px;
  background-color: #fff;
  outline-color: #2c3e50;
  color: black;
  text-align: center;
  @include font;
  transition:  build-transitions((background-color, color, box-shadow));

  &:active {
    box-shadow: button-shadow(#fff)
  }

  &:disabled {
    background-color: #d2d2d2;
  }
}

.button:not(.button_default) {
  border: none;
}

.button_kind {
  @each $name, $settings in $colors {
    &-#{$name} {
      $bg: map.get($settings, "background");
      background-color: $bg;
      color: map.get($settings, "text");
      &:disabled {
        background-color: disabled-color($bg);
      }

      &:active {
        box-shadow: button-shadow($bg)
      }
    }
  }
}
</style>
