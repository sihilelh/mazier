import { Graph } from "../utils/graph.utils";

interface GenerateMazeOptions {
  hCells: number;
  wCells: number;
  startCell: number;
}

export function generateMaze(options: GenerateMazeOptions): string[] {
  const graph = createMazeGraph(options.hCells, options.wCells);
  return randomDFS(graph, options.startCell.toString());
}

function createMazeGraph(h: number, w: number): Graph {
  const mazeGraph = new Graph();
  for (const str_i in Array.from({ length: h * w })) {
    const i = Number(str_i);
    mazeGraph.addVertex(`${i}`);

    // Calculate the (x,y) cords in the grid
    const y = i % h;
    const x = Math.floor(i / h);

    const rightFree = x + 1 < w;
    const bottomFree = y + 1 < h;
    if (bottomFree) {
      mazeGraph.addEdge(`${i}`, `${i + 1}`);
    }
    if (rightFree) {
      mazeGraph.addEdge(`${i}`, `${i + h}`);
    }
  }
  return mazeGraph;
}

function randomDFS(graph: Graph, startCell: string): string[] {
  const visited: Set<string> = new Set();
  const order: string[] = [];

  function dfs(startVertex: string) {
    visited.add(startVertex);
    order.push(startVertex);
    const neighborsInRandomOrder = Array.from(
      graph.getNeighbors(startVertex),
    ).sort(
      (a: string, b: string) =>
        Number(a) * Math.random() - Number(b) * Math.random(),
    );
    for (const n of neighborsInRandomOrder) {
      if (visited.has(n)) continue;
      dfs(n);
    }
  }

  dfs(startCell);
  return order;
}
