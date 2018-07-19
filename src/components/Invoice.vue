<template>
  <v-card id="invoice-page">
    <v-toolbar flat color="white">
      <v-tooltip bottom>
        <span slot="activator">
          <v-btn icon class="mx-0" @click.native="addInvoice">
            <v-icon color="blue darken-2">add_circle</v-icon>
          </v-btn>
        </span>
        <span>Add New Invoice</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click.native="print('updateOrder')">
        <v-icon left>print</v-icon> Print & Update Order
      </v-btn>
      <v-btn @click.native="print">Print</v-btn>
    </v-toolbar>

    <v-spacer></v-spacer>

    <v-container grid-list-md id="print-area">
      <v-layout row wrap>
        <!-- Invoice Here -->
        <InvoiceTemplate></InvoiceTemplate>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import html2canvas from 'html2canvas'
import InvoiceTemplate from './InvoiceTemplate'
/* eslint-disable */
export default {
  components: {
    InvoiceTemplate
  },
  data() {
    return {
      invoiceLists: this.$store.getters.getInvoiceLists,
    }
  },
  methods: {
    addInvoice() {
      console.log('Add Invoice')
    },
    print(printOption) {
      // Render data as image and attach to new window then call print function
      html2canvas(document.querySelector('#print-area'), {
        dpi: 150,
        width: 1240,
        height: '100%',
        logging: false
      })
      .then(canvas => {
        const myWindow = window.open()
        myWindow.document.body.appendChild(canvas)
        myWindow.print()
        myWindow.close()
      })
      if(printOption === 'updateOrder') {
        this.$store.dispatch('updateOrder', this.invoiceLists)
      }
    }
  },
  mounted() {
    // Generate barcode when element is render.
    this.$nextTick(() => {
      // this.barcodeLists.forEach((element, i) => {
      //   JsBarcode(`#barcode-${this.barcodeStartPos + i}`, element.basicInformation.orderNumber)
      // })
    })
  }
}
</script>

<style scoped>
  td {
    padding: 1rem;
  }
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