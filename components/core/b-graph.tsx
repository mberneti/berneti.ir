import React, { useEffect, useRef } from "react";
import ForceGraph3D from "3d-force-graph";
import SpriteText from "three-spritetext";

interface Props {
  nodes: Array<string>;
  edges: Array<[string, string]>;
}

// const getColorId = (x: any) => {
//   if (typeof x === "object") {
//     return x.id;
//   }
//   return x;
// };

export const BGraph: React.FC<Props> = ({ nodes, edges }: Props) => {
  const graphContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Random tree data generation
    // Random tree data generation
    // const N = 4;
    // const gData = {
    //   nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    //   links: [...Array(N).keys()]
    //     .filter((id) => id)
    //     .map((id) => ({
    //       source: id,
    //       target: Math.round(Math.random() * (id - 1)),
    //     })),
    // };
    const gData = {
      nodes: nodes.map((i) => ({ id: i, color: "#ffffff" })),
      // nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: edges.map(([source, target]) => ({
        source,
        target,
        linkColor: "#ffff00",
      })),
    };

    if (graphContainerRef.current) {
      // Initialize the 3D force graph
      const Graph = new ForceGraph3D(graphContainerRef.current,{
        rendererConfig: {},
        controlType: "orbit",
      })
        .graphData(gData)
        .backgroundColor("#000000")
        .nodeThreeObject((node) => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        })
        // .linkColor((a) => (getColorId(a.source) === "1" ? "red" : "lightblue")) // Optional, customize link color
        .width(graphContainerRef.current.clientWidth)
        .height((graphContainerRef.current.clientHeight * 50) / 100)
        .nodeAutoColorBy("group") // Optional, can be customized for different node colorings
        .linkWidth(2) // Optional, adjust link width
        .nodeLabel("id") // Show the node id as the label
        .nodeOpacity(1) // Optional, adjust node opacity
        .linkOpacity(0.6); // Optional, adjust link opacity

      setTimeout(() => {
        Graph.graphData(gData)
          // .linkColor((a) => {
          //   return getColorId(a.source) === "1" ? "yellow" : "lightblue";
          // })
          .zoomToFit(); // Optional, customize link color
      }, 100);
    }
  }, [nodes]);

  return <div ref={graphContainerRef} />;
};
