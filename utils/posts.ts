type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  category: string;
};

export type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
  id: string;
};

// Import all MDX files dynamically
const mdxModules = import.meta.glob('/mdx-posts/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) return { metadata: {} as Metadata, content: fileContent };

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/&+/g, 'and')
    .replace(/'/g, '')
    .replace(/[^a-z0-9-\u0600-\u06FF]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse all MDX files
const posts: Post[] = Object.entries(mdxModules).map(([path, content]) => {
  const { metadata, content: mdxContent } = parseFrontmatter(content as string);
  const id = path.match(/\/(\d+)\.mdx$/)?.[1] || '';

  return {
    metadata,
    slug: slugify(metadata.title),
    content: mdxContent,
    id,
  };
});

export function getBlogPosts(): Post[] {
  return posts;
}

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}
