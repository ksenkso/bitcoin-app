<template>
  <table>
    <thead>
      <tr>
        <th class="address">
          From
        </th>
        <th class="address">
          To
        </th>
        <th class="sum">
          Sum
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="message in transactions"
        :key="message.hash"
      >
        <td>
          <Link
            v-for="input in message.from"
            :key="input"
            :href="`https://www.blockchain.com/btc/address/${input}`"
            target="_blank"
          >
            {{ input }}
          </Link>
        </td>
        <td>
          <Link
            v-for="out in message.to"
            :key="out"
            :href="`https://www.blockchain.com/btc/address/${out}`"
            target="_blank"
          >
            {{ out }}
          </Link>
        </td>
        <td>{{ btcToString(message.value) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { btcToString } from '@/utils'
import Link from '@/components/Link.vue'
import { TransactionRow } from '@/composables/useUnconfirmedTransactions/types'

export default defineComponent({
  name: 'UnconfirmedTransactionsTable',
  components: { Link },
  props: {
    transactions: {
      type: Array as PropType<TransactionRow[]>,
      required: true,
    },
  },
  setup () {
    return {
      btcToString,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "~@/styles/_mixins.scss";

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid grey;
  table-layout: fixed;

  thead {
    top: 0;
    background-color: #fff;
  }

  th, td {
    border: 1px solid grey;
  }

  th {
    font-weight: bold;
    padding: 8px;

    &.address {
      width: 40ch;

      @include on-md {
        width: auto;
      }
    }

    &.sum {
      width: 16ch;
    }
  }

  td {
    padding: 4px;

    .link {
      display: block;
      white-space: normal;
      word-break: break-all;
    }
  }
}
</style>
