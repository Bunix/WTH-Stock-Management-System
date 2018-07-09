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
        item-key="id"
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
          <td>{{ props.item.order_number }}</td>
          <td>{{ props.item.orderQuantity }}</td>
          <td v-if="props.item.printStatus === true">
            <v-btn icon @click="setPrintStatus(props.item)" class="green--text"><v-icon>done</v-icon></v-btn>
          </td>
          <td v-else>
            <v-btn icon @click="setPrintStatus(props.item)" class="red--text"><v-icon>clear</v-icon></v-btn>
          </td>
          <td>{{ trimName(props.item.customer_name) }}</td>
          <td>{{ props.item.orderDate }}</td>
          <td v-if="typeof props.item.paidDate === 'undefined'">
            {{ props.index }}
            <!-- <template>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 lg6>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-icon color="blue darken-2" v-show="!paidDateFormatted[props.index]" slot="activator">
                        event
                      </v-icon>
                      <v-date-picker v-model="paidDate[props.index]" no-title>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="setPaidDate(props.item, props.index)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <p v-show="paidDateFormatted[props.index]" style="margin-bottom: 0">{{ paidDateFormatted[props.index] }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </template> -->
            <!-- ./ Date picker -->
            <template>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 lg6>
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-icon color="blue darken-2" slot="activator">
                        event
                      </v-icon>
                      <v-date-picker v-model="paidDate" no-title>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="setPaidDate(props.item)">OK</v-btn>
                        <p>{{props.index}}</p>
                      </v-date-picker>
                    </v-menu>

                    <!-- <p v-show="paidDateFormatted[props.index]" style="margin-bottom: 0">{{ paidDateFormatted[props.index] }}</p> -->
                  </v-flex>
                </v-layout>
              </v-container>
            </template>
          </td>
          <td v-else>{{ props.item.paidDate }}</td>
          <td v-if="typeof props.item.shipedDate === 'undefined'">-</td>
          <td v-else>{{ props.item.shipedDate }}</td>
          <td v-if="typeof props.item.shelf === 'undefined'">-</td>
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

export default {/* eslint-disable */
  data: () => ({
    // isFilter: false,
    menu: false,
    counter: 0,
    paidDate: null,
    paidDateFormatted: [],
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
      { text: 'Order Code', value: 'order_number' },
      { text: 'Product QTY', value: 'orderQuantity' },
      { text: 'Barcode', value: 'printStatus' },
      { text: 'Customer', value: 'customerInformation.customer_name' },
      { text: 'Order Date', value: 'basicInformation.orderDate' },
      { text: 'Paid Date', value: 'paidDate' },
      { text: 'Shiped Date', value: 'shipedDate' },
      { text: 'Shelf', value: 'shelf' }
    ]
  }),
  created() {
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  },
  firestore() {
    return {
      orderLists: db.collection('Order_Db')
    }
  },
  watch: {
    orderLists() {
      if(this.orderLists.length !== 0) {
        this.tblLoading = false
        this.orderListsTmp = this.orderLists
      }
    }
    // paidDate() {
    //   if (this.paidDate !== null) {
    //     this.paidDate.forEach((x, i) => {
    //       this.paidDateFormatted[i] = this.formatDate(x)
    //     })
    //   }
    // }
  },
  methods: {/* eslint-disable */
    setPaidDate(item) {
      console.log(item)
      const [year, month, day] = this.paidDate.split('-')
      item.paidDate = `${month}/${day}/${year}`
      this.$store.dispatch('setPaidDate', [item])
      this.menu = false
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    onBarcodeScanned(barcode) {
      /* eslint-disable */
      if(!this.isScanMode) {
        this.isAlert = true
        return
      }

      this.orderLists.forEach((order, i) => {
        order.order_number === barcode ? this.selected.push(this.orderLists[i]) : null
      })
    },
    // Reset to the last barcode before hitting enter (whatever anything in the input box)
    resetBarcode() {
      const barcode = this.$barcodeScanner.getPreviousCode()
      // do something...
    },
    searchQuery() {
      if(this.search !== '') {
  
        this.orderListsTmp = this.orderLists
          .filter((order) => {
            return order.customer_name.toLowerCase().includes(this.search)||order.order_number.toLowerCase().includes(this.search)
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
      return new Date(timeObj).toLocaleDateString()
    },
    getOrderQuatity(products) {
      let totalQuantity = 0
      for(let product in products) {
        totalQuantity += parseInt(products[product].product_quantity)
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
      const confirmDelete = confirm('Are you sure you want to delete this item?')
      if (confirmDelete) {
        this.$store.dispatch('deleteOrder', this.selected)
      }
    },
    setPrintStatus(item) {
      this.$store.dispatch('setPrintStatus', [item])
    },
    trimName(name) {
      return name.length > 10 ? `${name.slice(0, 9)}...` : name
    }
  },
  computed: {
    orderingList() {
      return this.orderListsTmp.map((order) => {
        // console.log(order.shipedDate)
        order.orderQuantity = this.getOrderQuatity(order.items)
        order.orderDate = this.getDate(order.order_date.date)
        // order.shipedDate = order.shipedDate !== '' ? this.getDate(order.shipedDate) : ''
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


