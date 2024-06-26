import Vue from "vue";
import App from "./App.vue";

import "./assets/main.css";
import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import Syntax from "./syntax";

Vue.use(VueQuillEditor /* { default global options } */);

import Quill from "quill";
Quill.register("modules/syntax", Syntax, true);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
