"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// changes are annotated with comments like // NEW or // CHANGED

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  colorLight?: string;
  colorDark?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  maxOpacityDark?: number;
  // NEW: guaranteed visibility floors
  minOpacity?: number;
  minOpacityDark?: number;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  colorLight,
  colorDark = "rgb(255, 255, 255)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  maxOpacityDark, // optional
  // NEW: floors tuned for visibility
  minOpacity = 0.06,
  minOpacityDark = 0.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const resolvedLight = colorLight ?? color ?? "rgb(0, 0, 0)";
  const resolvedDark = colorDark ?? "rgb(255, 255, 255)";

  // CHANGED: compute both floor and cap per theme
  const resolvedMinOpacity = useMemo(() => {
    return isDark ? minOpacityDark : minOpacity;
  }, [isDark, minOpacity, minOpacityDark]);

  const resolvedMaxOpacity = useMemo(() => {
    // Slightly higher default in dark mode so the grid reads on dark backgrounds
    if (isDark) return maxOpacityDark ?? Math.max(0.28, maxOpacity);
    return maxOpacity;
  }, [isDark, maxOpacity, maxOpacityDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only trust the html class set by the app
    const computeIsDark = () =>
      document.documentElement.classList.contains("dark");

    setIsDark(computeIsDark());

    const mo = new MutationObserver(() => setIsDark(computeIsDark()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Remove matchMedia listener entirely
    return () => {
      mo.disconnect();
    };
  }, []);

  const memoizedColor = useMemo(() => {
    const toRGBA = (c: string) => {
      if (typeof window === "undefined") return `rgba(0, 0, 0,`;
      const cnv = document.createElement("canvas");
      cnv.width = cnv.height = 1;
      const ctx = cnv.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    const chosen = isDark ? resolvedDark : resolvedLight;
    return toRGBA(chosen);
  }, [resolvedDark, resolvedLight, isDark]);

  // CHANGED: store ctx so we can scale once per resize/theme init
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridRef = useRef<{
    cols: number;
    rows: number;
    squares: Float32Array;
    dpr: number;
  } | null>(null);

  const initGrid = useCallback(
    (canvas: HTMLCanvasElement, cssW: number, cssH: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Scale drawing to CSS pixels for crisp retina rendering
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // resets and applies scale
      ctxRef.current = ctx;

      const cols = Math.max(1, Math.floor(cssW / (squareSize + gridGap)));
      const rows = Math.max(1, Math.floor(cssH / (squareSize + gridGap)));

      const squares = new Float32Array(cols * rows);
      const lo = Math.max(0, Math.min(1, resolvedMinOpacity));
      const hi = Math.max(lo, Math.min(1, resolvedMaxOpacity));
      for (let i = 0; i < squares.length; i++) {
        squares[i] = lo + Math.random() * (hi - lo);
      }

      const params = { cols, rows, squares, dpr };
      gridRef.current = params;
      return params;
    },
    [squareSize, gridGap, resolvedMinOpacity, resolvedMaxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number, lo: number, hi: number) => {
      const p =
        Math.max(0, Math.min(1, flickerChance)) * Math.max(0, deltaTime);
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < p) {
          squares[i] = lo + Math.random() * (hi - lo);
        }
      }
    },
    [flickerChance]
  );

  const drawGrid = useCallback(
    (cssW: number, cssH: number) => {
      const ctx = ctxRef.current;
      const grid = gridRef.current;
      if (!ctx || !grid) return;

      // Clear in CSS pixels because context is scaled
      ctx.clearRect(0, 0, cssW, cssH);

      const { cols, rows, squares } = grid;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    if (isDark === null) return; // wait for theme resolve

    let animationFrameId: number;
    let lastTime = 0;

    const updateCanvasSize = () => {
      const cssW = width || container.clientWidth;
      const cssH = height || container.clientHeight;
      setCanvasSize({ width: cssW, height: cssH });
      initGrid(canvas, cssW, cssH); // re-init grid with current min/max
    };

    updateCanvasSize();

    const animate = (time: number) => {
      if (!isInView) return;

      const grid = gridRef.current;
      if (!grid) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(
        grid.squares,
        deltaTime,
        Math.max(0, Math.min(1, resolvedMinOpacity)),
        Math.max(0, Math.min(1, resolvedMaxOpacity))
      );
      drawGrid(canvasSize.width, canvasSize.height);
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // kick animation when it becomes visible
        if (entry.isIntersecting) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    // also restart when theme switches so brightness updates immediately
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [
    width,
    height,
    isInView,
    isDark,
    resolvedMinOpacity,
    resolvedMaxOpacity,
    initGrid,
    updateSquares,
    drawGrid,
    canvasSize.width,
    canvasSize.height,
  ]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
};

export { FlickeringGrid };
