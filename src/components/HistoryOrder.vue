<template>
  <v-card class="dashboard">

      <v-toolbar color="white" flat>
          <v-toolbar-title class="font-weight-black blue--text text--darken-4">
            <h1 class="font-weight-black">Total Shipped: <span class="orange--text">{{ orderLists.length }}</span></h1>
          </v-toolbar-title>

          <v-spacer></v-spacer>

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
    
    <v-spacer></v-spacer>

    <template>
      <v-data-table
        :headers="headers"
        :items="orderListsTmp"
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
            <td class="green--text text--darken-4">{{ props.item.order_number }}</td>
            <td>{{ props.item.orderQuantity }}</td>
            <td>{{ props.item.customer_name }}</td>
            <td>{{ props.item.orderDate }}</td>
            <td>{{ props.item.paidDate }}</td>
            <td>{{ props.item.shipedDate }}</td>
            <td>{{ props.item.ems }}</td>
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

export default {/* eslint-disable */
  data() {
    return {
      orderLists: [],
      orderListsTmp: [],
      search: '',
      tblLoading: true,
      headers: [
        { text: 'Order Code', value: 'order_number' },
        { text: 'QTY', value: 'orderQuantity' },
        { text: 'Customer', value: 'customer_name' },
        { text: 'Ordered', value: 'order_date' },
        { text: 'Paid', value: 'paidDate' },
        { text: 'Shiped', value: 'shipedDate' },
        { text: 'EMS', value: 'ems' }
      ]
    }
  },
  firestore() {
    return {
      orderLists: db.collection('History_Order')
    }
  },
  watch: {
    orderLists() {
      if(this.orderLists.length !== 0) {
        this.tblLoading = false
        this.orderListsTmp = this.orderLists
      }
    }
  },
  methods: {/* eslint-disable */
    getProductInfo(item) {
      if(item !== undefined) {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(item.thumbnail) 
          ? item.thumbnail 
          : 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'
      } else {
        return 'https://www.freeiconspng.com/uploads/no-image-icon-15.png'
      }
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
    }
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


