<template>
  <v-card class="dashboard">

      <v-toolbar color="white" flat>

          <v-toolbar-title class="font-weight-black blue--text text--darken-4">
            <h1 class="font-weight-black">TOTAL ORDERS: <span class="orange--text">{{ orderingList.length }}</span></h1>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-title class="grey--text text--darken-2" style="background-color: #fbfbfb; border: 1px solid #eee; padding: 0.5rem 2rem; border-radius: 4px;">
            Scanner Mode: 
            <span v-if="isScanMode" class="green--text"> ON </span>
            <span v-else class="red--text"> OFF </span>
          </v-toolbar-title>

      </v-toolbar>

    <!-- ./ Summary Overview -->

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
    <!-- ./ Search bar -->


    <v-toolbar flat color="white">
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn icon class="mx-0" @click.native="addOrder">
            <v-icon color="blue darken-2">add_circle</v-icon>
          </v-btn>
        </span>
        <span>Add New Order</span>
      </v-tooltip>
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn icon class="mx-0" @click.native="isScanMode = !isScanMode">
            <v-icon :class="{'grey--text': !isScanMode, 'green--text': isScanMode}">center_focus_strong</v-icon>
          </v-btn>
        </span>
        <span v-if="isScanMode">Deactive Scan Mode</span>
        <span v-else>Active Scan Mode</span>
      </v-tooltip>
      
      <v-spacer></v-spacer>

      <v-btn v-if="selected.length > 0" color="primary" @click.native="generateBarcode">Get Order Barcode</v-btn>
      <v-btn v-if="selected.length > 0" dark color="pink darken-2" @click.native="generateInvoice">Get Invoice</v-btn>
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn v-if="selected.length > 0" icon class="mx-0" @click="deleteOrder">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </span>
        <span>Delete</span>
      </v-tooltip>
    </v-toolbar>
    
    <template>
      <v-alert
        v-model="isAlert"
        dismissible
        type="warning"
      >
        Please active scanner mode before use barcode scanner
      </v-alert>
    </template>
    <!-- ./ Menu Group -->

    <v-spacer></v-spacer>

    <template>
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
          <td v-if="props.item.printStatus === true">
            <v-btn icon @click="setStatus(props.item)" class="green--text"><v-icon>done</v-icon></v-btn>
          </td>
          <td v-else>
            <v-btn icon @click="setStatus(props.item)" class="red--text"><v-icon>clear</v-icon></v-btn>
          </td>
          <td>{{ trimName(props.item.customerInformation.name) }}</td>
          <td>{{ props.item.basicInformation.orderDate }}</td>
          <td v-if="props.item.shipedDate === ''">-</td>
          <td v-else>{{ props.item.shipedDate }}</td>
          <td v-if="props.item.shelf === ''">-</td>
          <td v-else>{{ props.item.shelf }}</td>
        </template>
      </v-data-table>
    </template>
    <!-- ./ Data table -->
  </v-card>
</template>
<script>

import db from '../firebaseInit'
const uuidv1 = require('uuid/v1')

export default {
  data: () => ({
    // isFilter: false,
    isScanMode: false,
    isAlert: false,
    toggle_exclusive: 0,
    selected: [],
    search: '',
    tblLoading: true,
    inStock: true,
    hasBarcode: false,
    orderLists: [],
    orderListsTmp: [],
    headers: [
      { text: 'Order Code', value: 'basicInformation.orderNumber' },
      { text: 'Product QTY', value: 'orderQuantity' },
      { text: 'Has Barcode', value: 'printStatus' },
      { text: 'Customer', value: 'customerInformation.name' },
      { text: 'Order Date', value: 'basicInformation.orderDate' },
      { text: 'Shiped Date', value: 'shipedDate' },
      { text: 'Paid Date', value: 'paidDate' },
      { text: 'Shelf', value: 'shelf' }
    ]
  }),
  created () {
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed () {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  },
  firestore () {
    return {
      orderLists: db.collection('Finished_Order')
    }
  },
  watch: {
    orderLists: function () {
      if(this.orderLists.length !== 0) {
        this.tblLoading = false
        this.orderListsTmp = this.orderLists
      }
    }
  },
  methods: {
    // Create callback function to receive barcode when the scanner is already done
    onBarcodeScanned (barcode) {
      /* eslint-disable */
      console.log(barcode)
      if(!this.isScanMode) {
        // console.log('Please active scanner mode')
        this.isAlert = true
        return
      }

      this.orderLists.forEach((order, i) => {
        if(order.basicInformation.orderNumber === barcode) {
          console.log('Push')
          this.selected.push(this.orderLists[i])
        }
      })
    },
    // Reset to the last barcode before hitting enter (whatever anything in the input box)
    resetBarcode () {
      let barcode = this.$barcodeScanner.getPreviousCode()
      // do something...
    },
    searchQuery() {
      if(this.search !== '') {
  
        this.orderListsTmp = this.orderLists
          .filter((order) => {
            return order.customerInformation.name.toLowerCase().includes(this.search) || order.basicInformation.orderNumber.toLowerCase().includes(this.search)
          })
      } else {
        this.orderListsTmp = this.orderLists
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
        shelf: '',
        key: uuidv1()
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
      this.$store.dispatch('generateBarcode', this.selected)
    },
    generateInvoice() {
      this.$store.dispatch('generateInvoice', this.selected)
    },
    deleteOrder() {
      let confirmDelete = confirm('Are you sure you want to delete this item?')
      if (confirmDelete) {
        this.$store.dispatch('deleteOrder', this.selected)
      }
    },
    setStatus(propsItem) {
      this.$store.dispatch('setPrintStatus', [propsItem])
    },
    trimName(name) {
      return `${name.slice(0, 9)}...`
    }
  },
  computed: {
    orderingList() {
      return this.orderListsTmp.map((order) => {
        order.orderQuantity = this.getOrderQuatity(order.checkOutInformation)
        order.basicInformation.orderDate = this.getDate(order.basicInformation.orderDate)
        order.shipedDate = order.shipedDate !== '' ? this.getDate(order.shipedDate) : ''
        return order
      })
    }
    // filteredItems() {
    //   if(this.isFilter) {
    //     return this.orderLists.filter((order) => {
    //       return order.inStock === this.inStock
    //     })
    //   } else {
    //     return this.orderLists
    //   }
    // }
  }
}
</script>

<style>
  .icon.scanMode {
    color: #00C853 !important;
  }

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


