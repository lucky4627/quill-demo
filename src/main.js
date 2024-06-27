import Vue from "vue";
import App from "./App.vue";

import "./assets/main.less";
import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import CodeBlockContainer from "./code";
import Syntax from "./syntax";
import LineNumbers, { LineNumber } from "./lineNumber";

Vue.use(VueQuillEditor /* { default global options } */);

import Quill from "quill";
Quill.register("formats/code-block-container", CodeBlockContainer, true);
Quill.register("modules/syntax", Syntax, true);
Quill.register("formats/line-numbers", LineNumbers, true);
Quill.register("formats/line-number", LineNumber, true);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
