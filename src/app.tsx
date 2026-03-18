import { useState } from "react";
import { generateMaze } from "./services/maze.service";

function App() {
  const [order, setOrder] = useState<string[]>([]);

  function generateMazeState() {
    const maze = generateMaze({
      hCells: 5,
      wCells: 6,
      startCell: 3,
    });
    setOrder(maze);
  }

  return (
    <div>
      <button onClick={generateMazeState}>Generate Maze</button>
      <code>{JSON.stringify(order, null, 2)}</code>
    </div>
  );
}

export default App;
