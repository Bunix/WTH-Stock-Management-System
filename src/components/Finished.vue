<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      hide-actions
      class="elevation-2"
      :loading="tblLoading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.basicInformation.orderNumber }}</td>
        <td>{{ props.item.customerInformation.name }}</td>
        <td>{{ props.item.inStock }}</td>
        <td>{{ props.item.basicInformation.orderDate.toDate() }}</td>
      </template>
    </v-data-table>
    <v-btn color="primary" @click.native="addOrder">Add Order</v-btn>
    <svg id="code128"></svg>
    <v-btn color="primary" @click.native="getbarcode">Barcode</v-btn>
  </div>
</template>
<script>
import { db } from '../main'
import jsbarcode from 'jsbarcode'

export default {
  data() {
    return {
      isFilter: false,
      tblLoading: true,
      inStock: false,
      hasBarcode: false,
      finishedOrder: [],
      headers: [
        { text: 'Order Number', value: 'basicInformation.orderNumber' },
        { text: 'Customer', value: 'customerInformation.name' },
        { text: 'In Stock', value: 'inStock' },
        { text: 'Create At', value: 'basicInformation.orderDate' }
      ]
    }
  },
  firestore () {
    return {
      finishedOrder: db.collection('Finished_Order')
    }
  },
  watch: {
    finishedOrder: function () {
      if(this.finishedOrder.length !== 0) {
        this.tblLoading = false
      }
    }
  },
  methods: {
    addOrder() {
      db.collection('Finished_Order').add({ 
        basicInformation: {
          orderDate: new Date('2018-06-05 12:05:06'),
          orderNumber: 'WTH180605G0122'
        },
        checkOutInformation: {
          23380656: {
            name: 'HONDA : Rear Carrier ',
            point: 138,
            price: 13151,
            quantity: 1
          }
        },
        customerInformation: {
          email: 'test@gmail.com',
          name: 'Dolores',
          role: 'Host'
        },
        deliveryInformation: {
          address: 'Westworld',
          name: 'Teddy',
          phome: '087-7174080'
        },
        inStock: false,
        paymentInformation: 'Credit card',
        total: {
          coupon: 0,
          fee: 0,
          shippingCost: 100,
          subtotal: 175480,
          totalAmount: 14,
          usePoint: 0
        }
      })
    },
    getbarcode() {
      jsbarcode("#code128", "WTH180605-1-A")
    }
  },
  computed: {
    filteredItems() {
      if(this.isFilter) {
        return this.finishedOrder.filter((order) => {
          return !this.finishedOrder || (order.inStock === this.inStock)
        })
      } else {
        return this.finishedOrder
      }
    }
  }
}

</script>
