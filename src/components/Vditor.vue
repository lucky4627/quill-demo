<template>
  <div style="padding-top: 100px">
    <div ref="containerRef" style="height: 200px"></div>
    <button @click="getHtml">export</button>
  </div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
const size = 1;
export default {
  data() {
    return {
      vditor: null,
    };
  },
  mounted() {
    this.vditor = new Vditor(this.$refs.containerRef, {
      mode: "wysiwyg",
      toolbar: [
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        {
          name: "sponsor",
          tip: "块级公式",
          tipPosition: "ne",
          hotkey: "⌘-⇧-E",
          className: "right",
          suffix: "$$",
          prefix: "$$",
          icon: '<svg t="1589994565028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2808" width="32" height="32"><path d="M506.6 423.6m-29.8 0a29.8 29.8 0 1 0 59.6 0 29.8 29.8 0 1 0-59.6 0Z" fill="#0F0F0F" p-id="2809"></path><path d="M717.8 114.5c-83.5 0-158.4 65.4-211.2 122-52.7-56.6-127.7-122-211.2-122-159.5 0-273.9 129.3-273.9 288.9C21.5 562.9 429.3 913 506.6 913s485.1-350.1 485.1-509.7c0.1-159.5-114.4-288.8-273.9-288.8z" fill="#FAFCFB" p-id="2810"></path><path d="M506.6 926c-22 0-61-20.1-116-59.6-51.5-37-109.9-86.4-164.6-139-65.4-63-217.5-220.6-217.5-324 0-81.4 28.6-157.1 80.6-213.1 53.2-57.2 126.4-88.8 206.3-88.8 40 0 81.8 14.1 124.2 41.9 28.1 18.4 56.6 42.8 86.9 74.2 30.3-31.5 58.9-55.8 86.9-74.2 42.5-27.8 84.3-41.9 124.2-41.9 79.9 0 153.2 31.5 206.3 88.8 52 56 80.6 131.7 80.6 213.1 0 103.4-152.1 261-217.5 324-54.6 52.6-113.1 102-164.6 139-54.8 39.5-93.8 59.6-115.8 59.6zM295.4 127.5c-72.6 0-139.1 28.6-187.3 80.4-47.5 51.2-73.7 120.6-73.7 195.4 0 64.8 78.3 178.9 209.6 305.3 53.8 51.8 111.2 100.3 161.7 136.6 56.1 40.4 88.9 54.8 100.9 54.8s44.7-14.4 100.9-54.8c50.5-36.3 108-84.9 161.7-136.6 131.2-126.4 209.6-240.5 209.6-305.3 0-74.9-26.2-144.2-73.7-195.4-48.2-51.9-114.7-80.4-187.3-80.4-61.8 0-127.8 38.5-201.7 117.9-2.5 2.6-5.9 4.1-9.5 4.1s-7.1-1.5-9.5-4.1C423.2 166 357.2 127.5 295.4 127.5z" fill="#141414" p-id="2811"></path><path d="M353.9 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2812"></path><path d="M659.3 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2813"></path><path d="M411.6 538.5c0 52.3 42.8 95 95 95 52.3 0 95-42.8 95-95v-31.7h-190v31.7z" fill="#5B5143" p-id="2814"></path><path d="M506.6 646.5c-59.6 0-108-48.5-108-108v-31.7c0-7.2 5.8-13 13-13h190.1c7.2 0 13 5.8 13 13v31.7c0 59.5-48.5 108-108.1 108z m-82-126.7v18.7c0 45.2 36.8 82 82 82s82-36.8 82-82v-18.7h-164z" fill="#141414" p-id="2815"></path><path d="M450.4 578.9a54.7 27.5 0 1 0 109.4 0 54.7 27.5 0 1 0-109.4 0Z" fill="#EA64F9" p-id="2816"></path><path d="M256 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2817"></path><path d="M703.3 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2818"></path></svg>',
          click: () => {
            this.vditor.insertValue("$a$");
          },
        },
        "|",
        "upload",
        "fullscreen",
        "edit-mode",
      ],
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      preview: {
        hljs: {
          defaultLang: "cpp",
          enable: true,
          lineNumber: true,
        },
        math: {
          engine: "KaTeX",
          inlineDigit: true,
        },
      },
      upload: {
        accept: "image/*",
        multiple: false,
        handler: this.beforeUpload,
      },
      after: () => {
        const md = this.vditor
          .html2md(`<p><img src="https://community.nanhubrain.com/admin/s3/download/17f43dbd-02db-4e8c-abf1-9e9958fe5334.png" alt="group.png" /></p>
<p><em><strong>yuyuy</strong></em></p>
<pre>#include &lt;stdio.h&gt;</pre>`);
        this.vditor.setValue(md);
      },
    });
  },
  methods: {
    beforeUpload(files) {
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];
      if (!file.type.match("image")) {
        return "请选择图片上传";
      } else if (file.size > size * 1024 * 1024) {
        return `请选择${size}M以内的图片上传`;
      }
      this.vditor.insertValue(
        `![${file.name}](https://community.nanhubrain.com/admin/s3/download/17f43dbd-02db-4e8c-abf1-9e9958fe5334.png)`,
        true
      );
      return "kkkk";
    },
    getHtml() {
      console.log(this.vditor.getHTML());
    },
  },
};
</script>
