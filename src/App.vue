<template>
  <div>
    <!-- Two-way Data-Binding -->
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />

    <!-- Or manually control the data synchronization -->
    <!-- <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  /> -->
    <pre class="language-css line-numbers">
    <code>
      p { color: red }
    </code>
  </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      editorOption: {
        // Some Quill options...
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],

            // [{ header: 1 }, { header: 2 }], // custom button values
            // [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            // [{ align: [] }],

            // ["clean"], // remove formatting button
          ],
          // syntax: {
          //   highlight: (text) => {
          //     const code = window.hljs.highlightAuto(text).value;
          //     setTimeout(() => {
          //       window.hljs.initLineNumbersOnLoad();
          //     }, 1000);
          //     return code;
          //   },
          // },
        },
      },
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },
};
</script>
