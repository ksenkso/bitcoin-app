<template>
  <Container>
    <div class="controls">
      <div
        v-if="!notAvailable && !ready"
        class="loading"
      >
        <Loader />
        {{ loaderMessage }}
      </div>
      <Alert
        v-if="notAvailable"
        kind="warning"
      >
        Не удалось подключиться
      </Alert>
      <template v-if="ready">
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
      </template>
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
import { computed, defineComponent, ref } from 'vue'
import { useUnconfirmedTransactions } from '@/composables/useBitcoin'
import { btcToString } from '@/utils'
import Button from '@/components/Button.vue'
import UnconfirmedTransactionsTable from '@/components/UnconfirmedTransactions/UnconfirmedTransactionsTable.vue'
import Container from '@/components/Container.vue'
import Loader from '@/components/Loader.vue'
import { RetryError } from '@/composables/useWebSocket'
import Alert from '@/components/Alert.vue'

export default defineComponent({
  name: 'UnconfirmedTransactions',
  components: {
    Alert,
    Loader,
    Container,
    UnconfirmedTransactionsTable,
    Button,
  },
  setup () {
    const {
      messages,
      listening,
      error,
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
        sum.value += lastMessage.value
      }
    })

    const clearMessages = () => {
      clear()
      sum.value = 0
    }

    const loaderMessage = computed(() => error.value ? 'Произошла ошибка, переподключение...' : 'Подключение')
    const notAvailable = ref(false)

    websocket.onClose(() => {
      try {
        websocket.reconnect()
      } catch (err) {
        if (err instanceof RetryError) {
          notAvailable.value = true
        }
      }
    })

    return {
      messages,
      listening,
      ready: websocket.ready,
      loaderMessage,
      stop,
      start,
      clearMessages,
      sum,
      notAvailable,
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
  margin-bottom: 2rem;

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

.loader {
  width: 42px;
  height: 42px;
}

.loading {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  justify-content: center;
  width: 100%;
}
</style>
