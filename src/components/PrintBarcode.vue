<template>
  <v-card class="sticker-paper">
    <div class="menu-grp">
      <v-btn color="primary" @click.native="test">Print</v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="i in 60" :key="`2${i}`" xs2>
          <v-card class="barcode">
            <v-card-text class="px-0">
              <div v-if="barcodeLists[i] != null">
                {{ barcodeLists[i].basicInformation.orderNumber }}
                <!-- {{ barcodeLists[i].basicInformation.name }} -->
              </div>
              <!-- <div v-else>
                <h3>{{ barcodeLists[i].key }}</h3>
              </div> -->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
// import jsbarcode from 'jsbarcode'

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
      barcodeLists: this.$store.getters.getBarcodePrintLists,
      barcodeSize: [248, 350],
      barcodePaperSize: [2480, 3508]
    }
  },
  methods: {
    test() {
      // eslint-disable-next-line
      console.log(this.$store);
      return this.barcodeLists
    }
  },
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
</style>


