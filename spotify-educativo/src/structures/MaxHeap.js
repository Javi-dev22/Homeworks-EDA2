export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(song) {
    this.heap.push(song);
    this._siftUp();
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._siftDown();
    return max;
  }

  // Retorna el Top 
  getTopK(k) {
    const clone = [...this.heap];
    const result = [];
    
    // Hacemos una copia teporal del heap para que no se dane 
    const tempHeap = new MaxHeap();
    tempHeap.heap = clone;

    for (let i = 0; i < k && tempHeap.heap.length > 0; i++) {
      result.push(tempHeap.extractMax());
    }
    return result;
  }

  _siftUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].plays >= this.heap[index].plays) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  _siftDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < length && this.heap[left].plays > this.heap[largest].plays) largest = left;
      if (right < length && this.heap[right].plays > this.heap[largest].plays) largest = right;

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}