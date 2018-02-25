<template>
  <div class="container">
      {{ post($route.params.filename) }}
      <textarea id="cms-editor"></textarea>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Pen = require('exports-loader?Pen!pen/src/pen')
// const markdown = require('exports-loader?markdown!pen/src/markdown')

export default {
  mounted() {
    this.initializePen(document.getElementById('cms-editor'))
  },
  computed: {
    ...mapGetters({
      post: 'getPostByFilename'
    })
  },
  methods: {
    initializePen(el) {
      return new Pen(el)
    }
  }
}
</script>
<style src="pen/src/pen.css"></style>


<style>

</style>
