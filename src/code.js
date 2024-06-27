import Quill from "quill";
const Delta = Quill.import("delta");
const Parchment = Quill.import("parchment");
const Container = Quill.import("blots/container");
const CodeBlock = Quill.import("formats/code-block");

// todo: 1. 删除合并 2. 重置格式 3. 从接口还原
class CodeBlockContainer extends Container {
  static create(value) {
    let node = super.create();
    if (node.domNode) {
      node.domNode.textContent = typeof value === "string" ? value : "";
    }
    return node;
  }

  static formats(node) {
    let span = node.querySelector(".ql-syntax");
    return span ? span.innerText : false;
  }

  format(name, value) {
    if (name === "code-block-container" && value) {
      let span = this.domNode.querySelector(".ql-syntax");
      if (span) {
        span.innerText = value;
      }
    } else {
      super.format(name, value);
    }
  }

  constructor(domNode) {
    super(domNode);
    this.domNode = domNode;
    if (this.domNode.textContent) {
      const item = Parchment.create(this.statics.defaultChild);
      const text = Parchment.create("text", this.domNode.textContent);
      item.appendChild(text);
      // item.domNode.innerHTML = this.domNode.textContent;
      this.domNode.textContent = "";
      this.appendChild(item);
    }
    if (domNode.querySelector(".code-block-container-lines")) return;
    const div = document.createElement("div");
    div.classList.add("code-block-container-lines");
    div.contentEditable = false;
    const span = document.createElement("div");
    span.classList.add("code-block-container-number");
    div.appendChild(span);
    this.domNode.prepend(div);
  }

  insertBefore(childBlot, refBlot) {
    if (childBlot.statics.blotName === this.statics.defaultChild) {
      super.insertBefore(childBlot, refBlot);
    } else {
      let index = refBlot ? refBlot.offset(this) : this.length();
      let after = this.split(index);
      if (after !== null) {
        after.parent?.insertBefore(childBlot, after);
      }
    }
  }

  optimize(context) {
    setTimeout(() => {
      const lines = this.domNode.querySelector(".code-block-container-lines");
      const h = lines?.clientHeight;
      const count = Math.ceil(h / 20);
      const children = lines.children ?? [];
      if (children.length === count) return;
      lines.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const span = document.createElement("div");
        span.classList.add("code-block-container-number");
        lines.appendChild(span);
      }
    }, 200);
    super.optimize(context);
    let next = this.next;
    if (
      next != null &&
      next.prev === this &&
      next.statics.blotName === this.statics.defaultChild
    ) {
      next.moveChildren(this);
      next.remove();
    }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item =
        this.children?.head ?? Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}

CodeBlockContainer.blotName = "code-block-container";
CodeBlockContainer.scope = Parchment.Scope.BLOCK_BLOT;
CodeBlockContainer.tagName = "DIV";
CodeBlockContainer.defaultChild = "code-block";
CodeBlockContainer.allowedChildren = [CodeBlock];
CodeBlockContainer.className = "code-block-container";

export default CodeBlockContainer;
