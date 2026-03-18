export class Graph {
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex))
      this.adjacencyList.set(vertex, new Set());
  }

  addEdge(vertex1: string, vertex2: string): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1)?.add(vertex2);
    this.adjacencyList.get(vertex2)?.add(vertex1);
  }

  getNeighbors(vertex: string): Set<string> {
    return this.adjacencyList.has(vertex)
      ? this.adjacencyList.get(vertex)!
      : new Set();
  }
}
