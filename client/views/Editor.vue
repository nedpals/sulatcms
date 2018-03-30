<template>
  <div class="container" id="cms-editor">
      <textarea v-html="post($route.params.filename).content"></textarea>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Pen = require('exports-loader?Pen!../lib/pen')
export default {
  mounted() {
    const editor = this.initializePen(document.getElementById('cms-editor'))
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
      return new Pen({
        editor: el,
        class: 'pen',
        debug: true,
        textarea: '<textarea name="content"></textarea>',
        list: [
          'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
          'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
        ],
        stay: true,
        linksInNewWindow: false,
        markdown: true
      })
    }
  }
}
</script>
<style src="pen/src/pen.css"></style>


<style>

</style>
