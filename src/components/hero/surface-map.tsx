"use client";

import { useEffect, useRef } from "react";

/**
 * "Surface map" — an abstract attack-surface graph. A slow sweep passes over
 * the nodes (a scan in progress) and the pointer acts as a probe that reveals
 * labels on nearby nodes. Pure 2D canvas; pauses off-screen and renders a
 * single static frame when the user prefers reduced motion.
 */

const LABELS = [
  ":22", ":80", ":443", ":8080", ":3306", ":6379", ":5432", ":25",
  "/api/v1/orgs/{id}", "/api/v1/users/me", "/admin", "/auth/session",
  "/oauth/callback", "/graphql", "/api/tokens", "/billing/invoices",
  "role: viewer", "role: admin", "scope: read", "tenant: b",
  "authz?", "owner == caller?", "SYN → SYN/ACK", "RST",
];

type Node = { x: number; y: number; r: number; label: string; heat: number; probe: number; hub: boolean };

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

export function SurfaceMap({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const monoFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim();
    const labelFont = `11px ${monoFamily ? `${monoFamily}, ` : ""}ui-monospace, monospace`;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let raf = 0;
    let running = false;
    let sweep = 0;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rand = rng(7);
      const cell = w < 640 ? 70 : 84;
      const cols = Math.ceil(w / cell) + 1;
      const rows = Math.ceil(h / cell) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() < 0.42) continue;
          const hub = rand() < 0.12;
          nodes.push({
            x: c * cell + (rand() - 0.5) * cell * 0.7,
            y: r * cell + (rand() - 0.5) * cell * 0.7,
            r: hub ? 2.4 : 1.4,
            label: LABELS[Math.floor(rand() * LABELS.length)],
            heat: 0,
            probe: 0,
            hub,
          });
        }
      }
      edges = [];
      const max = cell * 1.35;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < max * max && (nodes[i].hub || nodes[j].hub || rand() < 0.35)) edges.push([i, j]);
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!running) draw(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const band = 140;
      if (!reduce) sweep = (sweep + dt * 0.06) % (w + band * 2);
      const sx = reduce ? -9999 : sweep - band;

      for (const n of nodes) {
        const d = Math.abs(n.x - sx);
        if (d < 30) n.heat = 1;
        n.heat = Math.max(0, n.heat - dt * 0.00045);
        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const target = pointer.active && pd < 150 ? 1 - pd / 150 : 0;
        n.probe += (target - n.probe) * Math.min(1, dt * 0.012 || 1);
      }

      // edges
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const A = nodes[a];
        const B = nodes[b];
        const k = Math.max(A.heat, B.heat) * 0.35 + Math.max(A.probe, B.probe) * 0.6;
        ctx.strokeStyle = `rgba(230,232,235,${0.05 + k * 0.25})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // sweep line
      if (!reduce) {
        const g = ctx.createLinearGradient(sx - band, 0, sx, 0);
        g.addColorStop(0, "rgba(198,244,50,0)");
        g.addColorStop(1, "rgba(198,244,50,0.06)");
        ctx.fillStyle = g;
        ctx.fillRect(sx - band, 0, band, h);
        ctx.fillStyle = "rgba(198,244,50,0.35)";
        ctx.fillRect(sx, 0, 1, h);
      }

      // nodes
      for (const n of nodes) {
        const lit = Math.max(n.heat * 0.8, n.probe);
        ctx.fillStyle =
          n.probe > 0.15
            ? `rgba(198,244,50,${0.5 + n.probe * 0.5})`
            : `rgba(230,232,235,${0.22 + lit * 0.6})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.probe * 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = `rgba(230,232,235,${0.12 + lit * 0.4})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6 + n.probe * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // probe labels for the closest nodes
      if (pointer.active) {
        const near = nodes
          .filter((n) => n.probe > 0.35)
          .sort((a, b) => b.probe - a.probe)
          .slice(0, 4);
        ctx.font = labelFont;
        for (const n of near) {
          ctx.fillStyle = `rgba(198,244,50,${n.probe})`;
          ctx.fillText(n.label, n.x + 10, n.y - 8);
        }
        ctx.strokeStyle = "rgba(198,244,50,0.25)";
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 18, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = e.pointerType === "mouse" && pointer.y >= 0 && pointer.y <= rect.height;
      if (reduce) draw(16);
    };
    const onLeave = () => {
      pointer.active = false;
      if (reduce) draw(16);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
