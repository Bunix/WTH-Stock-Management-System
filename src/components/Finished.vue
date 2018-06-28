<template>
  <v-card class="dashboard">
       <v-card-title>
      <v-text-field
        @keyup="searchQuery"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div class="menu-grp">
      <!-- <v-btn color="primary" @click.native="addOrder">Add Order</v-btn> -->
      <v-btn color="primary"  @click.native="generateBarcode">Get Order Barcode</v-btn>
      <v-btn @click.native="setProductInStock">Add to Stock</v-btn>
    </div>

    <v-spacer></v-spacer>
    
    <v-data-table
      :headers="headers"
      :items="orderingList"
      select-all
      v-model="selected"
      hide-actions
      :loading="tblLoading"
      item-key="key"
      :search="search"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template> 
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.basicInformation.orderNumber }}</td>
        <td>{{ props.item.orderQuantity }}</td>
        <td v-if="props.item.printStatus === true"><i class="material-icons font-green">done</i></td>
        <td v-else><i class="material-icons font-red">clear</i></td>
        <td>{{ props.item.customerInformation.name }}</td>
        <td>{{ props.item.basicInformation.orderDate }}</td>
        <td v-if="props.item.shipedDate === ''">-</td>
        <td v-else>{{ props.item.shipedDate }}</td>
        <td v-if="props.item.shelf === ''">-</td>
        <td v-else>{{ props.item.shelf }}</td>
      </template>
    </v-data-table>
    <svg id="code128"></svg>
  </v-card>
</template>
<script>
import { db } from '../main'
// import jsbarcode from 'jsbarcode'
// const uuidv1 = require('uuid/v1')

export default {
  data() {
    return {
      // isFilter: false,
      selected: [],
      search: '',
      tblLoading: true,
      inStock: true,
      hasBarcode: false,
      finishedOrder: [],
      finishedOrderLocal: [],
      headers: [
        { text: 'Order Code', value: 'basicInformation.orderNumber' },
        { text: 'Product QTY', value: 'Product & Barcode Quatity' },
        { text: 'Has Barcode', value: 'Print Status' },
        { text: 'Customer', value: 'customerInformation.name' },
        { text: 'Order Date', value: 'basicInformation.orderDate' },
        { text: 'Shiped Date', value: 'Shipped Date' },
        { text: 'Shelf', value: 'Shelf' }
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
        this.finishedOrderLocal = this.finishedOrder
      }
    }
  },
  methods: {
    searchQuery() {
      if(this.search !== '') {
  
        this.finishedOrderLocal = this.finishedOrder
          .filter((order) => {
            return order.customerInformation.name.toLowerCase().includes(this.search) || order.basicInformation.orderNumber.toLowerCase().includes(this.search)
          })
      } else {
        this.finishedOrderLocal = this.finishedOrder
      }

    },

    addOrder() {
      db.collection('Finished_Order').add({ 
        basicInformation: {
          orderDate: new Date('2018-06-09 05:45:39'),
          orderNumber: 'WTH180609G0121'
        },
        checkOutInformation: {
          th0006604: {
            name: 'Ohlins : Rear Shock Absorber For Yamaha MT-09 Tracer/MT-09/XSR900 : Ohlins',
            point: 291,
            price: 27598,
            quantity: 1
          }
        },
        customerInformation: {
          email: 'jays4147@yahoo.com',
          name: 'Chessada Chinmateepitak',
          role: 'General'
        },
        deliveryInformation: {
          address: 'Westworld',
          name: 'Dolores',
          phone: '087-7114080'
        },
        paymentInformation: 'Credit card',
        total: {
          coupon: 0,
          fee: 0,
          shippingCost: 100,
          subtotal: 27598,
          totalAmount: 27598,
          usePoint: 0
        },
        inStock: false,
        inStockDate: '',
        shipedDate: '',
        trackingNumber: '',
        barcodeQuantity: 0,
        printStatus: false,
        shelf: ''
      })
    },
    getDate(timeObj) {
      return new Date(timeObj.seconds * 1000).toLocaleDateString()
    },
    getOrderQuatity(checkOutInformation) {
      let totalQuantity = 0
      for(let product in checkOutInformation) {
        totalQuantity += checkOutInformation[product].quantity
      }
      return totalQuantity
    },
    generateBarcode() {
      // eslint-disable-next-line
      // console.log(this.selected)
      this.$store.dispatch('printBarcode', this.selected)
    }
  },
  computed: {
    orderingList() {
      return this.finishedOrderLocal.map((order) => {
        // order.barcodeQuantity = this.getOrderQuatity(order.checkOutInformation)
        order.orderQuantity = this.getOrderQuatity(order.checkOutInformation)
        order.basicInformation.orderDate = this.getDate(order.basicInformation.orderDate)
        order.shipedDate = order.shipedDate !== '' ? this.getDate(order.shipedDate) : ''
        return order
      })
    }
    // filteredItems() {
    //   if(this.isFilter) {
    //     return this.finishedOrder.filter((order) => {
    //       return order.inStock === this.inStock
    //     })
    //   } else {
    //     return this.finishedOrder
    //   }
    // }
  }
}
</script>

<style>
  .font-red {
    color: rgb(230, 49, 49)
  }

  .font-green {
    color: rgb(17, 193, 87)
  }

  .dashboard {
    min-height: 100%;
  }
</style>


