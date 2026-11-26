export class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(songId) {
    if (!this.adjacencyList.has(songId)) {
      this.adjacencyList.set(songId, []);
    }
  }

  addEdge(songId1, songId2) {
    if (this.adjacencyList.has(songId1) && this.adjacencyList.has(songId2)) {
      this.adjacencyList.get(songId1).push(songId2);
      this.adjacencyList.get(songId2).push(songId1);
    }
  }

  getRecommendations(songId) {
    return this.adjacencyList.get(songId) || [];
  }
}