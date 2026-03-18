import { useEffect, useRef, useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { useMaze } from "../hooks/useMaze";
import { Input } from "./Input";
import { Button } from "./Button";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

function getCellCenter(
  index: string,
  grid: { w: number; h: number },
  cellWidth: number,
  cellHeight: number,
) {
  const i = parseInt(index);
  const row = i % grid.h;
  const col = Math.floor(i / grid.h);
  return {
    x: col * cellWidth + cellWidth / 2,
    y: row * cellHeight + cellHeight / 2,
  };
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: { w: number; h: number },
  cellWidth: number,
  cellHeight: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let i = 0; i <= grid.w; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellWidth, 0);
    ctx.lineTo(i * cellWidth, canvasHeight);
    ctx.stroke();
  }

  for (let i = 0; i <= grid.h; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(canvasWidth, i * cellHeight);
    ctx.stroke();
  }
}

function drawMaze(
  ctx: CanvasRenderingContext2D,
  order: string[],
  grid: { w: number; h: number },
  cellWidth: number,
  cellHeight: number,
) {
  if (order.length === 0) return;

  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;

  const start = getCellCenter(order[0], grid, cellWidth, cellHeight);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);

  for (let i = 1; i < order.length; i++) {
    const point = getCellCenter(order[i], grid, cellWidth, cellHeight);
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();
}

export function Maze() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvas(canvasRef, {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });
  const { order, generate } = useMaze();

  const [gridW, setGridW] = useState(12);
  const [gridH, setGridH] = useState(12);

  const grid = { w: gridW, h: gridH };
  const cellWidth = CANVAS_WIDTH / gridW;
  const cellHeight = CANVAS_HEIGHT / gridH;

  function handleGenerate() {
    generate({ wCells: gridW, hCells: gridH, startCell: 0 });
  }

  useEffect(() => {
    handleGenerate();
  }, []);

  useEffect(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid(ctx, grid, cellWidth, cellHeight, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawMaze(ctx, order, grid, cellWidth, cellHeight);
  }, [ctx, order, cellWidth, cellHeight]);

  function setGrid(o: "w" | "h", value: number) {
    if (o === "w") {
      setGridW(value);
    }
    if (o === "h") {
      setGridH(value);
    }
    handleGenerate();
  }

  return (
    <div>
      <div>
        <Input
          label="Width"
          type="number"
          min={2}
          value={gridW}
          onChange={(e) => setGrid("w", Number(e.target.value))}
        />
        <Input
          label="Height"
          type="number"
          min={2}
          value={gridH}
          onChange={(e) => setGrid("h", Number(e.target.value))}
        />
        <Button onClick={handleGenerate}>Regenerate</Button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
