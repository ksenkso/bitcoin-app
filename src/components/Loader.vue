<template>
  <img
    class="loader"
    src="@/assets/loader.svg"
    alt="Загрузка"
  >
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss" scoped>
.loader {

  animation: 2s linear infinite spin;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
