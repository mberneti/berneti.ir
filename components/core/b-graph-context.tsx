import React, { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import dagre from "dagre";

interface GraphProps {
  nodes: Array<string>;
  edges: Array<[string, string]>;
}

export const BGraph: React.FC<GraphProps> = ({ nodes: graphNodes, edges }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [edgeColors, setEdgeColors] = useState<Record<string, string>>({});

  // Create the graph for layout
  const g = new dagre.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(() => ({}));

  // Add nodes and edges to the graph
  graphNodes.forEach((node) => {
    g.setNode(node, { width: 50, height: 50 }); // Width and height can be customized
  });

  edges.forEach(([source, target]) => {
    g.setEdge(source, target);
  });

  // Run layout calculation
  dagre.layout(g);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Position nodes based on the layout
    const nodes = graphNodes.map((id) => {
      const node = g.node(id);
      return {
        x: node.x,
        y: node.y,
        id,
      };
    });

    console.log("rrr");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = "lightblue";
    ctx.lineWidth = 2;
    edges.forEach(([source, target]) => {
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = edgeColors[`${source}-${target}`] || "lightblue"; // Default color
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(({ id, x, y }) => {
      ctx.fillStyle = chroma.random().hex();
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw node ID next to the node
      ctx.fillStyle = "#fff"; // Set color for node ID text
      ctx.font = "12px Arial"; // Set font style
      ctx.fillText(id, x + 10, y); // Position text next to the node
    });
  }, [edges, edgeColors]);

  // Handle edge color update after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      const newEdgeColors: Record<string, string> = {};
      edges.forEach(([source, target]) => {
        newEdgeColors[`${source}-${target}`] = chroma.random().hex(); // Random edge color
      });
      setEdgeColors(newEdgeColors);
    }, 3000); // Change edge color after 3 seconds

    return () => clearTimeout(timer);
  }, [edges]);

  console.log(chroma.random().hex());

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "1px solid black" }}
    />
  );
};
