import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

/**
 * Custom rehype plugin to process inline math ($$...$$) in HTML text nodes
 */
function rehypeInlineMath() {
  return (tree: any) => {
    visit(tree, "text", (node: any, index: number, parent: any) => {
      if (!node.value || typeof node.value !== "string") return;

      // Match $$...$$ patterns for inline math
      const mathRegex = /\$\$(.+?)\$\$/g;

      if (!mathRegex.test(node.value)) return;

      // Reset regex
      mathRegex.lastIndex = 0;

      const newNodes: any[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = mathRegex.exec(node.value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // Add math node
        newNodes.push({
          type: "element",
          tagName: "span",
          properties: {
            className: ["math", "math-inline"],
          },
          children: [{ type: "text", value: match[1] }],
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the node with new nodes
      if (newNodes.length > 0 && parent && typeof index === "number") {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}

const components = {
  img: ({ src, alt, ...props }: any) => {
    return (
      <figure className="mx-auto rounded-lg overflow-hidden text-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain max-h-[500px] max-w-[500px] mx-auto"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-neutral-500 mt-3">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  code: ({ children, className, ...props }: any) => {
    return (
      <code className={className} {...props} dir="ltr">
        {children}
      </code>
    );
  },
  table: ({ children, ...props }: any) => {
    return (
      <div className="overflow-x-auto my-6">
        <table
          className="mx-auto border-collapse border border-neutral-300 dark:border-neutral-700"
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
  thead: ({ children, ...props }: any) => {
    return (
      <thead className="bg-neutral-100 dark:bg-neutral-800" {...props}>
        {children}
      </thead>
    );
  },
  tbody: ({ children, ...props }: any) => {
    return <tbody {...props}>{children}</tbody>;
  },
  tr: ({ children, ...props }: any) => {
    return (
      <tr
        className="border-b border-neutral-300 dark:border-neutral-700"
        {...props}
      >
        {children}
      </tr>
    );
  },
  th: ({ children, ...props }: any) => {
    return (
      <th
        className="px-4 py-2 text-left font-semibold border border-neutral-300 dark:border-neutral-700"
        {...props}
      >
        {children}
      </th>
    );
  },
  td: ({ children, ...props }: any) => {
    return (
      <td
        className="px-4 py-2 border border-neutral-300 dark:border-neutral-700"
        {...props}
      >
        {children}
      </td>
    );
  },
};

/**
 * Custom MDX renderer using react-markdown
 * Supports both $ and $$ for inline math
 */
export function CustomMDX({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        [
          remarkMath,
          {
            singleDollarTextMath: true,
          },
        ],
      ]}
      rehypePlugins={[
        rehypeRaw,
        rehypeInlineMath,
        [
          rehypeKatex,
          {
            output: "html",
            strict: false,
            trust: true,
          },
        ],
        rehypeHighlight,
      ]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  );
}
