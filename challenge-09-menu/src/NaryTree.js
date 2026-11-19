export class MenuNode {
  constructor(title, link = null, component = null) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return node;
  }
}