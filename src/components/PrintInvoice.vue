<template>
  <v-card id="invoice-page">
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

      <v-btn color="primary" @click.native="print('printAndUpdateStock')">
        <v-icon left>print</v-icon> Print & Update stock
      </v-btn>
      <v-btn @click.native="print">Print</v-btn>
    </v-toolbar>

    <v-spacer></v-spacer>

    <v-container grid-list-md id="print-area">
      <v-layout row wrap>
        <!-- Invoice Here -->
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      /* eslint-disable */
      try {
        if(vm.$store.getters.getBarcodePrintLists === null) {
          vm.$store.dispatch('returnHome')
        }
      } catch (error) {
        console.log(error)
      }
    })
  },
  data() {
    return {
      barcodeStartPos: 1,
      barcodeLists: this.$store.getters.getBarcodePrintLists,
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
      html2canvas(document.querySelector('#print-area'), {
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
      if(printOption === 'printAndUpdateStock') {
        this.$store.dispatch('printAndUpdateStock', this.barcodeLists)
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

  #invoice-page {
    width: 100%;
    min-height: 100%;
  }
</style>