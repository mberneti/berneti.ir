import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  category: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/&+/g, "and") // Replace '&' with 'and'
    .replace(/'/g, "") // Remove apostrophes
    .replace(/[^a-z0-9-\u0600-\u06FF]/g, "-") // Remove invalid characters
    .replace(/-+/g, "-") // Remove duplicate hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    return {
      metadata,
      slug: slugify(metadata.title),
      content,
      id: file.replace(/\.mdx$/, ""),
    };
  });
}

const postsRef = getMDXData(path.join(process.cwd(), "mdx-posts"));

export async function getBlogPosts() {
  return postsRef;
}
