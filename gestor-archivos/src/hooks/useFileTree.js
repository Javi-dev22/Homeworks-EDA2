import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { NaryTree } from '../services/naryTree';

export function useFileTree() {
  const [tree, setTree] = useState(new NaryTree());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nodesRef = ref(db, 'nodes');
    const unsubscribe = onValue(nodesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const flatNodes = Object.values(data);
        const newTree = NaryTree.fromFlatData(flatNodes);
        setTree(newTree);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addNode = async ({ name, type, email, parentId = null }) => {
    if (!['folder', 'file'].includes(type)) {
      throw new Error('El tipo debe ser carpeta o archivo');
    }

    if (parentId) {
      const parent = tree.nodes.get(parentId);
      if (!parent) {
        throw new Error('La carpeta seleccionada no existe');
      }
      if (parent.type !== 'folder') {
        throw new Error('No se puede agregar hijos a un archivo');
      }
    }

    const id = crypto.randomUUID();
    const newNode = { id, name, type, email, parentId };

    await set(ref(db, `nodes/${id}`), newNode);
    
    return newNode;
  };

  const getNestedTree = (parentId = null) => {
    if (parentId !== null) {
      const parent = tree.nodes.get(parentId);
      if (!parent || parent.type !== 'folder') return [];
    }

    const result = [];
    tree.nodes.forEach(node => {
      const nodeParentId = node.parentId ?? null;
      if (nodeParentId === parentId) {
        result.push({
          ...node,
          parentId: nodeParentId,
          children: getNestedTree(node.id)
        });
      }
    });
    return result;
  };

  return { tree, loading, addNode, getNestedTree };
}