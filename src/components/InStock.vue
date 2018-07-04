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
      <v-toolbar flat color="white">
        <v-tooltip bottom>
          <span slot="activator">
            <v-btn icon class="mx-0" @click.native="addOrder">
              <v-icon color="blue darken-2">add_circle</v-icon>
            </v-btn>
          </span>
          <span>Add New Order</span>
        </v-tooltip>
        <v-btn v-if="selected.length > 0" color="primary" @click.native="generateBarcode">Get Order Barcode</v-btn>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <span slot="activator">
            <v-btn v-if="selected.length > 0" icon class="mx-0" @click="deleteProducts">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </span>
          <span>Delete</span>
        </v-tooltip>

      </v-toolbar>
    </div>

    <v-spacer></v-spacer>

    <v-data-table
      :headers="headers"
      :items="inStockProductsTmp"
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
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.quantity }}</td>
        <td>{{ props.item.shelf }}</td>
      </template>

    </v-data-table>


  </v-card>
</template>

<script>

/* eslint-disable */
import db from '../firebaseInit'

export default {
  data() {
    return {
      search: '',
      inStockProducts: [],
      inStockProductsTmp: [],
      tblLoading: true,
      selected: [],
      headers: [
        { text: 'Product Code', value: 'Product Code' },
        { text: 'Product Name', value: 'Product Name' },
        { text: 'Price', value: 'Price' },
        { text: 'Quantity', value: 'Quantity' },
        { text: 'Shelf', value: 'Shelf' }
      ]
    }
  },
  firestore () {
    return {
      inStockProducts: db.collection('In_Stock_Products')
    }
  },
  methods: {
    searchQuery() {

      if(this.search !== '') {
        /* eslint-disable */
        this.inStockProductsTmp = this.inStockProducts
          .filter((product) => {
            return product.id.toLowerCase().includes(this.search) || product.name.toLowerCase().includes(this.search)
          })
      } else {
        this.inStockProductsTmp = this.inStockProducts
      }
    },
    deleteProducts() {
      let confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        this.$store.dispatch('deleteProducts', this.selected)
      }
    },
  },
  watch: {
    inStockProducts: function () {
      if(this.inStockProducts.length !== 0) {
        this.tblLoading = false
        this.inStockProductsTmp = this.inStockProducts 
      }
    }
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

