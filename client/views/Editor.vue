<template>
  <div class="container">
      {{ post($route.params.filename) }}
      <div class="cms-editor"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as Pen from 'pen/src/pen'
import * as markdown from 'pen/src/markdown'

export default {
  created() {
    const editor = this.initializePen(document.getElementsByClassName('cms-editor')[0])
    editor.rebuild()
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
