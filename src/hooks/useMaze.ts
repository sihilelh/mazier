import { useState } from "react";
import {
  generateMaze,
  type GenerateMazeOptions,
} from "../services/maze.service";

export function useMaze() {
  const [order, setOrder] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<number>(0);
  function generate(options: Omit<GenerateMazeOptions, "startCell">) {
    setStartCell(getRandomEdgeCell(options));
    setOrder(generateMaze({ ...options, startCell }));
  }

  function getRandomEdgeCell(options: { wCells: number; hCells: number }): number {
    const { wCells, hCells } = options;
    const edges = [];
    for (let i = 0; i < hCells; i++) {
      edges.push(i); // left edge
      edges.push(i + (hCells * (wCells - 1))); // right edge
    }
    for (let i = 0; i < wCells; i++) {
      edges.push(i * hCells); // top edge
      edges.push((i + 1) * hCells - 1); // bottom edge
    }
    return edges[Math.floor(Math.random() * edges.length)];
  }
  return {
    generate,
    order,
    startCell,
  };
}
