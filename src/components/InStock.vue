<template>
  <v-card class="dashboard">

      <v-toolbar color="white" flat>
        <v-toolbar-title class="font-weight-black blue--text text--darken-4">
          <h1 class="font-weight-black">SKU: <span class="orange--text">{{ inStockProductsTmp.length }}</span></h1>
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

      <v-btn v-if="selected.length > 0" color="primary" @click.native="generateBarcode">Get Barcode</v-btn>
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn v-if="selected.length > 0" icon class="mx-0" @click="deleteProducts">
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

   <v-toolbar flat color="white" style="height: 0 !important">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Set Shelf</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="shelf" label="Shelf"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

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
        <td>{{ props.item.brand }}</td>
        <td>{{ props.item.quantity }}</td>
        <td v-if="typeof props.item.shelf === 'undefined'">
          <v-btn icon @click="setShelf(props.item)">
            <v-icon small>
              edit
            </v-icon>
          </v-btn>
        </td>
        <td v-else>
          <v-btn icon @click="setShelf(props.item)">
            {{ props.item.shelf }}
          </v-btn>
        </td>
      </template>

    </v-data-table>


  </v-card>
</template>

<script>

/* eslint-disable */
import db from '../firebaseInit'

export default {
  data: () => ({
    isAlert: false,
    isScanMode: false,
    dialog: false,
    shelf: '',
    editedItem: '',
    search: '',
    inStockProducts: [],
    inStockProductsTmp: [],
    tblLoading: true,
    selected: [],
    headers: [
      { text: 'Product Code', value: 'id' },
      { text: 'Product Name', value: 'name' },
      { text: 'Brand', value: 'brand' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Shelf', value: 'shelf' }
    ]
  }),
  created() {
    // Add barcode scan listener and pass the callback function
    // console.log('init scanner')
    this.$barcodeScanner.init(this.onBarcodeScanned)

    // console.log(this.$barcodeScanner)
  },
  // destroyed() {
  //   // Remove listener when component is destroyed
  //   console.log('Remove listener')
  //   this.$barcodeScanner.destroy()
  // },
  firestore () {
    return {
      inStockProducts: db.collection('In_Stock_Products')
    }
  },
  methods: {
    onBarcodeScanned(barcode) {
      console.log(barcode)
      /* eslint-disable */
      if(!this.isScanMode) {
        this.isAlert = true
        return
      }

      this.inStockProducts.forEach((product, i) => {
        product.id === barcode ? this.selected.push(this.inStockProducts[i]) : null
      })
    },
    // // Reset to the last barcode before hitting enter (whatever anything in the input box)
    // resetBarcode() {
    //   const barcode = this.$barcodeScanner.getPreviousCode()
    //   // do something...
    // },
    generateBarcode() {
      // console.log(this.selected)
      this.$store.dispatch('generateBarcodeProduct', this.selected)
    },
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
    setShelf(item) {
      this.editedItem = item
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },
    close() {
      this.dialog = false
    },
    save() {
      this.editedItem.shelf = this.shelf
      this.$store.dispatch('setShelf', this.editedItem)
      this.close()
    }
  },
  watch: {
    inStockProducts: function () {
      if(this.inStockProducts.length !== 0) {
        this.tblLoading = false
        this.inStockProductsTmp = this.inStockProducts 
      }
    },
    dialog (val) {
      val || this.close()
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

