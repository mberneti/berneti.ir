"use client";
import { Box } from "@/components/core/Box";
import { BGraph } from "@/components/core/b-graph";
import { TextField } from "@/components/core/TextField";
import { useDebounce } from "ahooks";
import { useEffect, useState } from "react";

export default function ShortestPage() {
  const [edgesString, setEdgesString] = useState<string>(
    "[[1, 2], [1, 4], [2, 3], [3, 4]]"
  );
  const [edges, setEdges] = useState<Array<[number, number]>>([]);
  const convertEdges = (edges: string) => {
    try {
      return JSON.parse(edges);
    } catch {
      return [];
    }
  };
  const debouncedValue = useDebounce(edgesString, {
    wait: 300,
    leading: false,
    trailing: true,
  });

  useEffect(() => {
    setEdges(convertEdges(debouncedValue));
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgesString(e.target.value);
  };

  const getGraph = () => {
    try {
      return {
        nodes: Array.from(new Set(edges.flat())).map((node) => node.toString()),
        edges: edges.map(([from, to]) => [
          from.toString(),
          to.toString(),
        ]) as Array<[string, string]>,
      };
    } catch {
      return {
        nodes: [] as string[],
        edges: [] as Array<[string, string]>,
      };
    }
  };

  const graph = getGraph();

  return (
    <Box dir="ltr" className="font-v1-e">
      <TextField
        placeholder="edges like: [[1,2],[2,3]]"
        onChange={handleChange}
        value={edgesString}
      />
      <BGraph {...graph} />
    </Box>
  );
}
