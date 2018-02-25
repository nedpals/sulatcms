<template>
  <div class="container" id="cms-editor">
      <textarea v-html="post($route.params.filename).content"></textarea>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Pen = require('exports-loader?Pen!pen/src/pen')
import markdown from 'pen/src/markdown'
Pen.markdown = markdown

export default {
  mounted() {
    const editor = this.initializePen(document.getElementById('cms-editor'))
    console.log(Pen.markdown)
    editor.focus()
    editor.on("change", () => {
      const val = this.editor.value()
      this.$emit('input', val)
    })

    this.editor = editor
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
