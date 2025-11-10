"use client";
import React, { useEffect, useRef } from "react";
import Graph from "graphology";
import { Sigma } from "sigma";
import chroma from "chroma-js";
import forceAtlas2 from "graphology-layout-forceatlas2";
import noverlap from "graphology-layout-noverlap";

interface Props {
  nodes: Array<string>;
  edges: Array<[string, string]>;
}

export const BGraph: React.FC<Props> = ({ nodes, edges }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a graph using graphology
    const graph = new Graph({
      multi: false,
      allowSelfLoops: false,
      type: "directed",
    });
    nodes.forEach((node) => {
      graph.addNode(node, {
        label: node,
        x: 0,
        y: 0,
        size: 10,
        color: chroma.random().hex(),
      });
    });

    // Add edges to the graph
    edges.forEach(([source, target]) => {
      graph.addEdge(source, target);
    });

    // Initialize Sigma and bind it to the container
    const container = containerRef.current;
    if (container) {
      // --------------
      noverlap.assign(graph, 20);
      forceAtlas2.assign(graph, {
        iterations: 20,
      });

      const sigmaRenderer = new Sigma(graph, container, {
        labelColor: {
          // color: "#fff",
          attribute: "color",
        },
        defaultNodeColor: "#333",
        autoCenter: true,
        autoRescale: true,
      });
      setTimeout(() => {
        graph.updateEdgeAttribute("1", "2", "color", () => "#ff0000"); // Change the edge color
      }, 2000);

      return () => {
        sigmaRenderer.kill(); // Clean up on unmount
      };
    }
  }, [edges]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};
