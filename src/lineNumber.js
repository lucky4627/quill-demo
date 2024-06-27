import Quill from "quill";
const Parchment = Quill.import("parchment");
const Container = Quill.import("blots/container");
const Block = Quill.import("blots/block");

class LineNumber extends Block {
  static create() {
    let node = super.create();
    return node;
  }

  static formats() {
    return true;
  }
}

LineNumber.blotName = "line-number";
LineNumber.scope = Parchment.Scope.BLOCK_BLOT;
LineNumber.tagName = "DIV";
LineNumber.className = "code-block-container-number";

class LineNumbers extends Container {
  static create() {
    let node = super.create();
    node.setAttribute("contenteditable", false);
    return node;
  }

  static formats() {
    return true;
  }

  constructor(domNode) {
    super(domNode);
    this.resize();
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
    });

    // 开始监听元素
    resizeObserver.observe(domNode);
  }

  resize() {
    const h = this.domNode?.clientHeight;
    const count = Math.ceil(h / 20);
    const children = this.domNode.children ?? [];
    if (count === children.length) return;
    if (count > children.length) {
      for (let i = children.length; i < count; i++) {
        const span = Parchment.create("line-number");
        this.appendChild(span);
      }
    }
    if (count < children.length) {
      for (let i = children.length; i > count; i--) {
        this.children.head.remove();
      }
    }
  }
}

LineNumbers.blotName = "line-numbers";
LineNumbers.scope = Parchment.Scope.BLOCK_BLOT;
LineNumbers.tagName = "DIV";
LineNumbers.defaultChild = "line-number";
LineNumbers.allowedChildren = [LineNumber];
LineNumbers.className = "code-block-container-lines";

export { LineNumber, LineNumbers as default };
