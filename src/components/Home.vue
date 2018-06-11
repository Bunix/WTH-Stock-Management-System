<template>
  <div>
    <h1>Hello World</h1>
    <p v-text="finishedOrder"></p>
  </div>
</template>

<script>
import { db } from '../main'

export default {
  data() {
    return {
      finishedOrder: []
    }
  },
  firestore () {
    return {
      finishedOrder: db.collection('Finished_Order')
    }
  }
}

</script>
