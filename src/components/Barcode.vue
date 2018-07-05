<template>
  <v-card class="sticker-paper">
    <v-toolbar flat color="white">
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn icon class="mx-0" @click.native="addBarcode">
            <v-icon color="blue darken-2">add_circle</v-icon>
          </v-btn>
        </span>
        <span>Add New Barcode</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click.native="print('updateStock')">
        <v-icon left>print</v-icon>Print & Update stock
      </v-btn>
      <v-btn @click.native="print">Print</v-btn>
    </v-toolbar>

    <v-spacer></v-spacer>

    <v-container grid-list-md id="barcode-paper">
      <v-layout row wrap>
        <v-flex v-for="i in 60" :key="`2${i}`" xs3>
          <v-card class="barcode" v-if="i < barcodeStartPos">
            <v-card-text class="px-0">
              
            </v-card-text>
          </v-card>
          <v-card class="barcode" v-else>
            <v-card-text class="px-0" v-if="typeof barcodeLists[i-barcodeStartPos] !== 'undefined'">
              <svg v-bind:id="'barcode-' + i"></svg>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import JsBarcode from 'jsbarcode'
import html2canvas from 'html2canvas'
/* eslint-disable */
export default {
  // Use this function if want to redirect user to home when they not select barcode.
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     /* eslint-disable */
  //     try {
  //       if(vm.$store.getters.getBarcodeLists === null) {
  //         vm.$store.dispatch('returnHome')
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })
  // },
  data() {
    return {
      barcodeStartPos: 1,
      barcodeLists: this.$store.getters.getBarcodeLists,
      barcodeSize: [248, 350],
      barcodePaperSize: [2480, 3508]
    }
  },
  methods: {
    addBarcode() {
      console.log('Add barcode')
    },
    print(printOption) {
      // Render data as image and attach to new window then call print function
      html2canvas(document.querySelector('#barcode-paper'), {
        dpi: 150,
        width: 1240,
        height: 1754,
        logging: false
      })
      .then(canvas => {
        const myWindow = window.open()
        myWindow.document.body.appendChild(canvas)
        myWindow.print()
        myWindow.close()
      })
      if(printOption === 'updateStock') {
        this.$store.dispatch('updateStock', this.barcodeLists)
      }
    }
  },
  mounted() {
    // Generate barcode when element is render.
    this.$nextTick(() => {
      this.barcodeLists.forEach((element, i) => {
        JsBarcode(`#barcode-${this.barcodeStartPos + i}`, element.basicInformation.orderNumber)
      })
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

  .sticker-paper {
    width: 100%;
    min-height: 100%;
  }

  .barcode {
    min-height: 178px;
    max-height: 178px;
    padding: 0.5rem;
  }

  .barcode svg {
    width: 100%;
    height: auto;
  }
</style>