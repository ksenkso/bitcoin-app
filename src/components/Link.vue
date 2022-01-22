<template>
  <a
    class="link"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'Link',
}
</script>

<style lang="scss" scoped>
.link {
  color: #000;
  margin-bottom: 4px;
}
</style>
