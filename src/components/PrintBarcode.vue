<template>
  <v-card class="sticker-paper">
    <div class="menu-grp">
      <v-btn color="primary" @click.native="print">Print</v-btn>
      <v-btn @click.native="test('print-area')">Click</v-btn>
    </div>

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
              <h5>{{barcodeLists[i-barcodeStartPos].basicInformation.orderNumber}}</h5>
              <!-- <p>{{i-barcodeStartPos}}</p> -->
              <svg v-bind:id="'barcode-' + i"></svg>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div id="print-area"></div>
  </v-card>
</template>

<script>
import JsBarcode from 'jsbarcode'
import html2canvas from 'html2canvas'

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
      barcodeStartPos: 1,
      barcodeLists: this.$store.getters.getBarcodePrintLists,
      barcodeSize: [248, 350],
      barcodePaperSize: [2480, 3508]
    }
  },
  methods: {
    test(divName) {
      // window.print();
      /* eslint-disable */
      console.log(document.getElementById(divName))
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
    },
    print() {
      this.barcodeLists.forEach((element, i) => {
        // eslint-disable-next-line
        // console.log(element.basicInformation.orderNumber)
        JsBarcode(`#barcode-${i+1}`, element.basicInformation.orderNumber)
      })

      html2canvas(document.querySelector('#barcode-paper'), {
        // dpi: 150,
        width: 1240,
        height: 1754
      })
      .then(canvas => {
        /* eslint-disable */
        let myImage = canvas.toDataURL('image/png')
        let img = `<img src="${myImage}" width="1240px", height="1754px">`
        document.getElementById('print-area').innerHTML = img
        // 'PRINT'
        // const mywindow = window.open('', 'height=1754px, width=1240px')
        //   mywindow.document.write('<html><head><title>' + document.title  + '</title>')
        //   mywindow.document.write('</head><body >')
        //   mywindow.document.write(`<img src="${myImage}" width="1240px", height="1754px">`)
        //   mywindow.document.write('</body></html>')

        // mywindow.document.close() // necessary for IE >= 10
        // mywindow.focus() // necessary for IE >= 10*/

        // mywindow.print()
        // mywindow.close()

        // return true
      })
    }
  }
}
</script>

<style>
  #print-area {
    display: none;
  }

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