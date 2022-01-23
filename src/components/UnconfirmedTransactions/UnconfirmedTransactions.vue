<template>
  <Container>
    <div class="controls__container">
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
      <div
        v-if="ready"
        class="controls"
      >
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
          :disabled="!transactions.length"
          @click="clear"
        >
          Сброс
        </Button>
      </div>
    </div>
    <div class="sum">
      Сумма: {{ btcToString(sum) }}
    </div>
    <div class="table-container">
      <UnconfirmedTransactionsTable :transactions="transactions" />
    </div>
  </Container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useUnconfirmedTransactions } from '@/composables/useUnconfirmedTransactions/useUnconfirmedTransactions'
import { btcToString, intToFloatValue } from '@/utils'
import Button from '@/components/Button.vue'
import UnconfirmedTransactionsTable from '@/components/UnconfirmedTransactions/UnconfirmedTransactionsTable.vue'
import Container from '@/components/Container.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/Alert.vue'
import { RetryError } from '@/composables/useWebSocket/RetryError'
import { TransactionRow, UnconfirmedTransaction } from '@/composables/useUnconfirmedTransactions/types'

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
      listening,
      error,
      start,
      stop,
      keepAlive,
      websocket,
    } = useUnconfirmedTransactions(addTransaction)

    const transactions = ref<TransactionRow[]>([])
    const sum = ref(0)

    function addTransaction (transaction: UnconfirmedTransaction): void {
      const row = extractFields(transaction)
      transactions.value.push(row)
      sum.value += row.value
    }

    const clear = () => {
      transactions.value = []
      sum.value = 0
    }

    function extractFields (transaction: UnconfirmedTransaction): TransactionRow {
      return {
        hash: transaction.x.hash,
        from: transaction.x.inputs.map(input => input.prev_out.addr),
        to: transaction.x.out.map(out => out.addr),
        value: transaction.x.inputs.reduce((acc, input) => {
          return acc + intToFloatValue(input.prev_out.value)
        }, 0),
      }
    }

    const loaderMessage = computed(() => error.value ? 'Произошла ошибка, переподключение...' : 'Подключение')
    const notAvailable = ref(false)

    websocket.onOpen(() => {
      keepAlive()
    })

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
      transactions,
      listening,
      ready: websocket.ready,
      loaderMessage,
      stop,
      start,
      clear,
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

  &__container {
    margin-bottom: 2rem;
  }

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
