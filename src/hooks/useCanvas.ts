import { useEffect, useState, type RefObject } from "react";

interface CanvasOptions {
  width?: number;
  height?: number;
}

export function useCanvas(
  ref: RefObject<HTMLCanvasElement | null>,
  options?: CanvasOptions,
) {
  const [ctx, setCTX] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (options?.width) canvas.width = options.width;
    if (options?.height) canvas.height = options.height;

    const context = canvas.getContext("2d");
    setCTX(context);
  }, [ref, options?.width, options?.height]);

  return ctx;
}
