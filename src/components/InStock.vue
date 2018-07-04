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

    <v-spacer></v-spacer>

    <v-data-table
      :headers="headers"
      :items="stockLists"
      select-all
      v-model="selected"
      hide-actions
      :loading="tblLoading"
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
        <td>{{ props.item.sku }}</td>
        <td>{{ props.item.detail.name }}</td>
        <td>{{ props.item.detail.price }}</td>
        <td>{{ props.item.detail.quantity }}</td>
        <td>{{ props.item.detail.shelf }}</td>
        <!-- <td v-if="props.item.printStatus === true">
          <v-btn icon @click="toggleStatus(props.item)" class="green--text">
            <v-icon>done</v-icon>
          </v-btn>
        </td>
        <td v-else>
          <v-btn icon @click="toggleStatus(props.item)" class="red--text">
            <v-icon>clear</v-icon>
          </v-btn>
        </td>

        <td>{{ props.item.customerInformation.name }}</td>
        <td>{{ props.item.basicInformation.orderDate }}</td>
        <td v-if="props.item.shipedDate === ''">-</td>
        <td v-else>{{ props.item.shipedDate }}</td>
        <td v-if="props.item.shelf === ''">-</td>
        <td v-else>{{ props.item.shelf }}</td> -->
      </template>

    </v-data-table>

    <!-- <p>{{stockLists}}</p> -->

  </v-card>
</template>

<script>

export default {
  data() {
    return {
      isFirstFetch: true,
      search: '',
      inStockProducts: [],
      inStockProductsLocal: [],
      tblLoading: true,
      selected: [],
      productLists: null,
      headers: [
        { text: 'Product Code', value: 'Product Code' },
        { text: 'Product Name', value: 'Product Name' },
        { text: 'Price', value: 'Price' },
        { text: 'Quantity', value: 'Quantity' },
        { text: 'Shelf', value: 'Shelf' }
      ]
    }
  },
  methods: {
    searchQuery() {
      if(this.search !== '') {
        /* eslint-disable */
        // this.inStockProducts.map((x) => {
        //   console.log(x.customerInformation)
        // })
        this.inStockProducts = this.inStockProducts
        .filter((product) => {
          return product.sku.toLowerCase().includes(this.search) || product.detail.name.toLowerCase().includes(this.search)
        })
        // console.log(this.inStockProducts)
      } else {
        this.inStockProducts = this.inStockProductsLocal
      }
    }
  },
  watch: {
    inStockProducts: function () {
      /* eslint-disable */
      // console.log('I\'m watching you')
      // console.log(this.inStockProducts.length)
      if(this.inStockProducts.length !== 0) {
        this.tblLoading = false
      }
    }
  },
  computed: {
    stockLists() {
      if(this.isFirstFetch) {
        this.inStockProducts = this.$store.getters.getInStockProductLists
        this.inStockProductsLocal = this.inStockProducts
        this.isFirstFetch = false
      }
      // console.log('Computed')
      // console.log(this.inStockProducts)
      return this.inStockProducts
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

