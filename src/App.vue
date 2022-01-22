<template>
  <UnconfirmedTransactions />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UnconfirmedTransactions from '@/components/UnconfirmedTransactions/UnconfirmedTransactions.vue'

export default defineComponent({
  name: 'App',
  components: {
    UnconfirmedTransactions,
  },
})
</script>
