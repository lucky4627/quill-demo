import Quill from "quill";
const Parchment = Quill.import("parchment");
const Module = Quill.import("core/module");
const CodeBlock = Quill.import("formats/code-block");

class SyntaxCodeBlock extends CodeBlock {
  replaceWith(block) {
    this.domNode.textContent = this.domNode.textContent;
    this.attach();
    super.replaceWith(block);
  }

  highlight(highlight) {
    let text = this.domNode.textContent;
    if (this.cachedText !== text) {
      if (text.trim().length > 0 || this.cachedText == null) {
        this.domNode.innerHTML = `<code class="language-js">${highlight(
          text
        )}</code>`;
        this.domNode.normalize();
        this.attach();
      }
      this.cachedText = text;
    }
  }
}
SyntaxCodeBlock.className = "ql-syntax";

let CodeToken = new Parchment.Attributor.Class("token", "hljs", {
  scope: Parchment.Scope.INLINE,
});

class Syntax extends Module {
  static register() {
    console.log("11");
    Quill.register(CodeToken, true);
    Quill.register(SyntaxCodeBlock, true);
  }

  constructor(quill, options) {
    super(quill, options);
    console.log("22");
    if (typeof this.options.highlight !== "function") {
      throw new Error(
        "Syntax module requires highlight.js. Please include the library on the page before Quill."
      );
    }
    let timer = null;
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.highlight();
        timer = null;
      }, this.options.interval);
    });
    this.highlight();
  }

  highlight() {
    if (this.quill.selection.composing) return;
    this.quill.update(Quill.sources.USER);
    let range = this.quill.getSelection();
    this.quill.scroll.descendants(SyntaxCodeBlock).forEach((code) => {
      code.highlight(this.options.highlight);
    });
    this.quill.update(Quill.sources.SILENT);
    if (range != null) {
      this.quill.setSelection(range, Quill.sources.SILENT);
    }
  }
}
Syntax.DEFAULTS = {
  highlight: (function () {
    if (window.hljs == null) return null;
    return function (text) {
      let result = window.hljs.highlightAuto(text);
      return result.value;
    };
  })(),
  interval: 1000,
};

export { SyntaxCodeBlock as CodeBlock, CodeToken, Syntax as default };
