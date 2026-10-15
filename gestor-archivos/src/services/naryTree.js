export class TreeNode {
  constructor({ id, name, type, email, parentId = null }) {
    this.id = id;
    this.name = name;
    this.type = type; // 'folder' | 'file'
    this.email = email;
    this.parentId = parentId;
    this.children = [];
  }
}

export class NaryTree {
  constructor() {
    this.nodes = new Map();
  }

  addNode({ name, type, email, parentId = null }) {
    if (!['folder', 'file'].includes(type)) {
      throw new Error('El tipo debe ser carpeta o archivo');
    }

    if (parentId) {
      const parent = this.nodes.get(parentId);
      if (!parent) throw new Error('La carpeta seleccionada no existe');
      if (parent.type !== 'folder') {
        throw new Error('No se puede agregar hijos a un archivo');
      }
    }

    const id = crypto.randomUUID();
    const node = new TreeNode({ id, name, type, email, parentId });
    this.nodes.set(id, node);

    if (parentId) {
      this.nodes.get(parentId).children.push(node);
    }
    return node;
  }

  getAllNodes() {
    return Array.from(this.nodes.values());
  }

  static fromFlatData(flatNodes) {
    const tree = new NaryTree();
    flatNodes.forEach(nodeData => {
      tree.nodes.set(nodeData.id, nodeData);
    });
    flatNodes.forEach(node => {
      if (node.parentId) {
        const parent = tree.nodes.get(node.parentId);
        if (parent && parent.type === 'folder') {
          parent.children.push(node);
        }
      }
    });
    return tree;
  }

  toFlatData() {
    return Array.from(this.nodes.values()).map(node => ({
      id: node.id,
      name: node.name,
      type: node.type,
      email: node.email,
      parentId: node.parentId
    }));
  }
}