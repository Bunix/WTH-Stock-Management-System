<template>
  <v-card class="dashboard">
    <v-card-title>
      <v-layout row>
        <v-flex>
          <h1 class="font-weight-black blue--text text--darken-4 ">
            SKU: <span class="orange--text">{{ inStockProductsTmp.length }}</span>
          </h1>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
    </v-card-title>
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
          {{ props.item.shelf }}
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

