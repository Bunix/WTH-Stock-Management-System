<template>
  <div>
    <h1>Hello Dolores</h1>
    <v-btn flat @click="fetchData">
      Fetch Data
    </v-btn>
    <h3>{{ result }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: ''
    }
  },
  methods: {
    fetchData() {
      let name = 'codemzy'
      let url = 'http://anyorigin.com/go?url=' + encodeURIComponent('https://www.codewars.com/users/') + name + '&callback=?'
      fetch(url)
        .then(r => r.json()).then(res => {
          this.result = res
        })
    }
  }
}
</script>
