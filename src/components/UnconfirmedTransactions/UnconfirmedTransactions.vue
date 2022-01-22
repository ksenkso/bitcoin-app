<template>
  <Container>
    <div class="controls">
      <Button
        kind="success"
        size="xl"
        :disabled="listening"
        @click="start"
      >
        Запуск
      </Button>
      <Button
        kind="danger"
        size="xl"
        :disabled="!listening"
        @click="stop"
      >
        Остановка
      </Button>
      <Button
        kind="warning"
        size="xl"
        :disabled="!messages.length"
        @click="clearMessages"
      >
        Сброс
      </Button>
    </div>
    <div class="sum">
      Сумма: {{ btcToString(sum) }}
    </div>
    <div class="table-container">
      <UnconfirmedTransactionsTable :messages="messages" />
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUnconfirmedTransactions } from '@/composables/useBitcoin'
import { btcToString } from '@/utils'
import Button from '@/components/Button.vue'
import UnconfirmedTransactionsTable from '@/components/UnconfirmedTransactions/UnconfirmedTransactionsTable.vue'
import Container from '@/components/Container.vue'

export default defineComponent({
  name: 'UnconfirmedTransactions',
  components: {
    Container,
    UnconfirmedTransactionsTable,
    Button,
  },
  setup () {
    const {
      messages,
      listening,
      start,
      clear,
      stop,
      websocket,
    } = useUnconfirmedTransactions()

    // оптимизация, чтобы не ходить по всему массиву на каждое сообщение
    const sum = ref(0)

    websocket.onMessage(() => {
      if (messages.value.length) {
        const lastMessage = messages.value[messages.value.length - 1]
        sum.value += Number(lastMessage.value)
      }
    })

    const clearMessages = () => {
      clear()
      sum.value = 0
    }

    return {
      messages,
      listening,
      stop,
      start,
      clearMessages,
      sum,
      btcToString,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "~@/styles/_mixins.scss";

.controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .button {
    min-width: 25%;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  @include on-sm {
    flex-direction: column;
    row-gap: .25rem;
  }
}

.sum {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-container {
  overflow: auto;
  flex: 1;
}
</style>
