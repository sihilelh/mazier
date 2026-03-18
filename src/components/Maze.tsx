import { useEffect, useRef, useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { useMaze } from "../hooks/useMaze";
import { Input } from "./Input";
import { Button } from "./Button";
import { Wand2, LayoutGrid, Download } from "lucide-react";

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
    if (order[i] === "DE") {
      ctx.stroke();
      if (i + 1 < order.length) {
        const next = getCellCenter(order[i + 1], grid, cellWidth, cellHeight);
        ctx.beginPath();
        ctx.moveTo(next.x, next.y);
      }
      continue;
    }

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
  }, [gridW, gridH]);

  useEffect(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid(ctx, grid, cellWidth, cellHeight, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawMaze(ctx, order, grid, cellWidth, cellHeight);
  }, [ctx, order, cellWidth, cellHeight]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext("2d")!;
    offCtx.fillStyle = "#ffffff";
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
    offCtx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = "mazier.png";
    link.href = offscreen.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5 w-full max-w-[632px]">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        <div className="flex items-center gap-3 justify-center">
          <Input
            label="W"
            icon={<LayoutGrid size={16} />}
            type="number"
            min={2}
            value={gridW}
            onChange={(e) => setGridW(Number(e.target.value))}
          />
          <Input
            label="H"
            type="number"
            min={2}
            value={gridH}
            onChange={(e) => setGridH(Number(e.target.value))}
          />
        </div>
        <Button
          onClick={handleGenerate}
          icon={<Wand2 size={16} />}
          className="w-full sm:w-auto sm:ml-auto"
        >
          Generate
        </Button>
      </div>

      <div className="relative w-full max-w-[600px] mx-auto">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto border-2 border-ink bg-white shadow-[3px_3px_0px_var(--color-shadow)]"
        />
        <button
          onClick={handleDownload}
          title="Download as PNG"
          className="absolute bottom-2 right-2
            w-8 h-8 flex items-center justify-center
            border-2 border-ink rounded-sm cursor-pointer
            bg-[rgba(245,240,232,0.9)] text-ink
            transition-colors duration-150
            hover:bg-ink hover:text-paper
            active:bg-accent active:border-accent active:text-paper
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
