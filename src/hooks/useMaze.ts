import { useState } from "react";
import {
  generateMaze,
  type GenerateMazeOptions,
} from "../services/maze.service";

export function useMaze() {
  const [order, setOrder] = useState<string[]>([]);
  function generate(options: GenerateMazeOptions) {
    setOrder(generateMaze(options));
  }
  return {
    generate,
    order,
  };
}
