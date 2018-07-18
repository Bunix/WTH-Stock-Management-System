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
          <tr @click.prevent.stop="props.expanded = !props.expanded">
            <td>
              <v-checkbox
                @click.stop
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="green--text text--darken-4">{{ props.item.order_number }}</td>
            <td>{{ props.item.orderQuantity }}</td>
            <td v-if="props.item.printStatus === true">
              <v-btn icon @click.stop="setPrintStatus(props.item)" class="green--text"><v-icon>done</v-icon></v-btn>
            </td>
            <td v-else>
              <v-btn icon @click.stop="setPrintStatus(props.item)" class="red--text"><v-icon>clear</v-icon></v-btn>
            </td>
            <td>{{ props.item.customer_name }}</td>
            <td>{{ props.item.orderDate }}</td>
            <td v-if="typeof props.item.paidDate === 'undefined'">
              <template>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12 lg6>
                      <v-menu
                        ref="menu"
                        :return-value.sync="props.item.setPaidDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        open-on-hover
                      >
                        <v-icon color="blue darken-2" slot="activator">
                          event
                        </v-icon>

                        <v-date-picker v-model="paidDate[props.index]" no-title>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="setPaidDate(props.item, props.index)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
            </td>
            <td v-else>{{ props.item.paidDate }}</td>
            <td v-if="typeof props.item.shipedDate === 'undefined'">-</td>
            <td v-else>{{ props.item.shipedDate }}</td>
            <td v-if="typeof props.item.shelfLists === 'undefined'">{{ getShelf(props.item) }}</td>
            <td v-else>{{ props.item.shelfLists }}</td>
            <td v-if="typeof props.item.ems === 'undefined'">-</td>
            <td v-else>{{ props.item.ems }}</td>
          </tr>
        </template>
        <!-- ./ Data -->
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-list dense class="height-300">
              <template v-for="(item, index) in props.item.items">
                <v-divider
                  v-if="index > 0"
                  :key="index"
                ></v-divider>

                <v-list-tile
                  :key="item.product_name"
                  avatar
                >
                  <v-list-tile-avatar class="product-thumb">
                    <img :src="getProductInfo(item.product_images[0])" width="100%">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <div class="pl-4">
                    <v-list-tile-title>
                      {{ item.product_name }}
                      <span> ({{ item.product_number }})</span>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      Qyt: {{ item.product_quantity }} -- {{ item.product_manufacturer }}
                    </v-list-tile-sub-title>
                    </div>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
            
          </v-card>
        </template>
        <!-- ./ Expand -->
      </v-data-table>
    </template>
    <!-- ./ Data table -->
  </v-card>
</template>
<script>

import db from '../firebaseInit'
const uuidv1 = require('uuid/v1')

export default {/* eslint-disable */
  data() {
    return {
      // isFilter: false,
      // shelfLists: '',
      menu: false,
      paidDate: [],
      paidDateFormatted: [],
      isScanMode: false,
      isAlert: false,
      selected: [],
      search: '',
      tblLoading: true,
      inStock: true,
      hasBarcode: false,
      orderLists: [],
      orderListsTmp: [],
      headers: [
        { text: 'Order Code', value: 'order_number' },
        { text: 'QTY', value: 'orderQuantity' },
        { text: 'Barcode', value: 'printStatus' },
        { text: 'Customer', value: 'customer_name' },
        { text: 'Ordered', value: 'order_date' },
        { text: 'Paid', value: 'paidDate' },
        { text: 'Shiped', value: 'shipedDate' },
        { text: 'Shelf', value: 'shelfLists' },
        { text: 'EMS', value: 'ems' }
      ]
    }
  },
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
      orderLists: db.collection('Order_Db'),
      // shelfLists: db.collection('In_Stock_Products')
    }
  },
  watch: {
    // shelfLists() {
    //   console.log('Watch')
    //   console.log(this.shelfLists)
    //   // if(this.shelfLists.length !== 0) {
    //   //   console.log('Set Shelf')
    //   //   this.setShelfData()
    //   // }
    //   // console.log([...this.shelfLists])
    // },
    orderLists() {
      // console.log('Hello')
      if(this.orderLists.length !== 0) {
        // console.log('Set Order')
        this.tblLoading = false
        this.orderListsTmp = this.orderLists
        this.$store.dispatch('setShelfLists', [...this.orderListsTmp])
      }
    }
  },
  methods: {/* eslint-disable */
    getShelf(order) {
      // console.log(order)
      // console.log(this.shelfLists)
      return order.items.map((item) => {
        // console.log('map')
        return this.shelfLists[item.product_number]
      })
      // console.log(this.$store.getters.getBarcodeLists)
    },
    getProductInfo(item) {
      // const regX = new RegExp('(?i)\.(jpg|png|gif)', 'g')
      if(item !== undefined) {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(item.thumbnail) ? item.thumbnail : 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'
      } else {
        return 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'
      }
    },
    setPaidDate(item, index) {
      const [year, month, day] = this.paidDate[index].split('-')
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
        const searchKey = this.search.toLowerCase()
        this.orderListsTmp = this.orderLists
          .filter((order) => {
            const orderNumber = order.order_number.toLowerCase()
            const cusName = order.customer_name.toLowerCase()
            return orderNumber.includes(searchKey) || cusName.includes(searchKey)
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
    // setShelfData() {
      
    //   this.orderLists.map((order) => {
    //     let shelf = []
    //     console.log(order)
    //     order.items.forEach((sku) => {
    //       this.shelfLists.forEach((x) => {
    //         // console.log(x)
    //         if(sku.product_number === x.id) {
    //           // console.log(x.shelf)
    //           shelf.push(x.shelf)
    //         }
    //       })
    //     })
    //     order.shelfLists = shelf
    //     // console.log(order)
    //     return order
    //   })
      
      // this.orderLists.items.forEach((sku) => {
      //   console.log(sku.product_number)
      // })
      // return 'Test'
    // }
  },
  computed: {
    orderingList() {
      return this.orderListsTmp.map((order) => {
        order.orderQuantity = this.getOrderQuatity(order.items)
        order.orderDate = this.getDate(order.order_date.date)
        return order
      })
    },
    shelfLists() {
      return this.$store.getters.getShelfLists
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
  .product-thumb .avatar {
    height: 100px !important;
    width: 100px !important;
  }

  .product-thumb .avatar img {
    border-radius: 0;
  }

  .height-300.list--dense .list__tile--avatar{
    height: 150px !important;
  }

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


