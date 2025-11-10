import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

const components = {
  img: ({ src, alt, ...props }: any) => {
    return (
      <figure className="mx-auto my-2">
        <img src={src} alt={alt} {...props} />
        <figcaption>{alt}</figcaption>
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
};

/**
 * Custom MDX renderer using react-markdown
 */
export function CustomMDX({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  );
}
