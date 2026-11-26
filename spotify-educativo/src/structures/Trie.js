class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.songData = null; 
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insertar canción
  insert(song) {
    let node = this.root;
    const title = song.title.toLowerCase();
    for (let char of title) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.songData = song;
  }

  // Buscar si una canción exacta existe
  search(title) {
    let node = this.root;
    const lowerTitle = title.toLowerCase();
    for (let char of lowerTitle) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // Obtener sugerencias por prefijo
  getSuggestions(prefix) {
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();
    
    // Navegar hasta el final del prefijo
    for (let char of lowerPrefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    const suggestions = [];
    this._collect(node, suggestions);
    return suggestions;
  }

  _collect(node, arr) {
    if (node.isEndOfWord) arr.push(node.songData);
    for (let char in node.children) {
      this._collect(node.children[char], arr);
    }
  }
}