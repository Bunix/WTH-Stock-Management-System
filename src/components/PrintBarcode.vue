<template>
  <v-card class="sticker-paper">
    <div class="menu-grp">
      <v-btn color="primary" @click.native="test">Print</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="i in 60" :key="`2${i}`" xs2>
          <v-card class="barcode" v-if="i < barcodeStartPos">
            <v-card-text class="px-0">
              
            </v-card-text>
          </v-card>
          <v-card class="barcode" v-else>
            <v-card-text class="px-0" v-if="typeof barcodeLists[i-barcodeStartPos] !== 'undefined'">
              <h5>{{barcodeLists[i-barcodeStartPos].basicInformation.orderNumber}}</h5>
              <!-- <p>{{i-barcodeStartPos}}</p> -->
              <svg v-bind:id="'barcode-'+i" width="100%" height="80px"></svg>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import jsbarcode from 'jsbarcode'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.$store.getters.getBarcodePrintLists === null) {
        vm.$store.dispatch('returnHome')
      }
    })
  },
  data() {
    return {
      // id = '',
      barcodeStartPos: 1,
      barcodeLists: this.$store.getters.getBarcodePrintLists,
      barcodeSize: [248, 350],
      barcodePaperSize: [2480, 3508]
    }
  },
  methods: {
    test() {
      // eslint-disable-next-line
      // console.log(this.$store)
      jsbarcode('#barcode-1', 'WTH180609G0121')
      // return this.barcodeLists
    }
  },
  updated: function() {
    jsbarcode('#barcode-1', 'test', {format: "ean13"})
    // eslint-disable-next-line
    // console.log(this.barcodeLists)
    // this.barcodeLists.forEach((element) => {
    //   // eslint-disable-next-line
    //   // jsbarcode(`#barcode-${i+1}`, element)
      
    // })
    // generateBarcode() {
      // jsbarcode('#code128', 'WTH180605-1-A')
      // this.barcodeLists.forEach((order, index) => {
      //   // eslint-disable-next-line
      //   console.log('Index:' + index)
      //   jsbarcode(`#${index}`, order.basicInformation.orderNumber)
      // })
      // eslint-disable-next-line
      // console.log('On create')
      // jsbarcode('#code128', 'WTH180605-1-A')
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

  .sticker-paper {
    width: 100%;
    min-height: 100%;
  }

  .barcode {
    min-height: 150px;
    padding: 0.5rem;
  }

  .barcode svg {
    width: 100%;
    height: auto;
  }
</style>


