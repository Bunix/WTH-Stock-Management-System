<template>
  <v-card class="dashboard">

    <v-card-title>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-spacer></v-spacer>

    <v-data-table
      :headers="headers"
      :items="stockLists"
      select-all
      v-model="selected"
      hide-actions
      :loading="tblLoading"
    >
    </v-data-table>

  </v-card>
</template>

<script>

export default {
  data() {
    return {
      inStockProducts: [],
      inStockProductsLocal: [],
      tblLoading: true,
      selected: [],
      productLists: null,
      headers: [
        { text: 'Product Code', value: 'Product Code' },
        { text: 'Product Name', value: 'Product Name' },
        { text: 'Point', value: 'Point' },
        { text: 'Price', value: 'Price' },
        { text: 'Quantity', value: 'Quantity' },
        { text: 'Shelf', value: 'Shelf' }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => { // ES6 arrow function
    /* eslint-disable */
    console.log('mount')
      this.inStockProducts = this.$store.getters.getInStockProductLists
    })
  },
  watch: {
    inStockProducts: function () {
      /* eslint-disable */
      console.log('I\'m watching you')
      if(this.inStockProducts.length !== 0) {
        this.tblLoading = false
        this.inStockProductsLocal = this.inStockProducts
      }
    }
  },
  computed: {
    stockLists() {
      this.inStockProducts = this.$store.getters.getInStockProductLists
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('inStockProduct')
    })
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

