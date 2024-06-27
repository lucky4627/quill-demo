<template>
  <div class="line-numbers">
    <!-- Two-way Data-Binding -->
    <quill-editor :content="code" :options="editorOption" />

    <!-- Or manually control the data synchronization -->
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange"
    />
    <!-- <div class="ql-snow">
      <div class="ql-editor" v-html="code"></div>
    </div> -->
    <button @click="highlightCode">format</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ``,
      editorOption: {
        // Some Quill options...
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block", "code-block-container"],
            ["link", "image", "video", "formula"],

            // [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            // [{ align: [] }],

            // ["clean"], // remove formatting button
          ],
          // syntax: true,
          // syntax: {
          //   highlight: (text) => {
          //     return Prism.highlight(
          //       text,
          //       Prism.languages.javascript,
          //       "javascript"
          //     );
          //   },
          // },
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
        formats: [
          "code-block-container",
          "code-block",
          "list",
          "check",
          "bullet",
          "ordered",
          "blockquote",
          "link",
          "image",
          "video",
          "formula",
        ],
      },
      code: `<div class="code-block-container"><div class="code-block-container-lines" contenteditable="false"><div class="code-block-container-number"></div></div><pre class="ql-syntax" spellcheck="false">fds
f
</pre></div>`,
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
      // console.log("editor change!", quill, html, text);
      this.content = html;
      // console.log(html);
    },
    highlightCode() {
      console.log(this.content);
      this.code = this.content;
    },
  },
  // computed: {
  //   editor() {
  //     return this.$refs.myQuillEditor.quill;
  //   },
  // },
  mounted() {
    // Prism.highlightAll();
    // console.log("this is current quill instance object", this.editor);
  },
};
</script>
