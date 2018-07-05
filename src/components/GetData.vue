<template>
  <div>
    {{ info  }}
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  export default {
    data () {
      return {
        info: null
      }
    },
    mounted () {
      console.log(this.$axios)
      axios
        .get('http://209.58.177.24:81/api/orders/getOrdersNumber')
        .then(response => (this.info = response))
    }
  }
</script>