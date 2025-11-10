import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define types
type Post = {
  Id: number;
  Title: string;
  CreatedOn: string;
  HtmlContent: string;
  Abstract: string;
  PostCategoryId: number;
};

type Tag = {
  Id: number;
  Name: string;
};

type PostTag = {
  PostId: number;
  TagId: number;
};

type Category = {
  Id: number;
  Title: string;
  ParentId: number | null;
};

type File = {
  Name: string;
  Title: string;
  IsImage: number;
};

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data
const postsData: { Posts: Post[] } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "Posts_202410130232.json"), "utf-8")
);
const tagsData: { Tags: Tag[] } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "Tags_202410130237.json"), "utf-8")
);
const postsJoinTagsData: { PostsJoinTags: PostTag[] } = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "PostsJoinTags_202410130237.json"),
    "utf-8"
  )
);
const categoriesData: { PostCategories: Category[] } = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "PostCategories_202410130232.json"),
    "utf-8"
  )
);
const filesData: { Files: File[] } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "Files_202410130231.json"), "utf-8")
);

// Create output directory
const outputDir = path.join(__dirname, "mdx_posts");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Helper functions
const getTagsForPost = (postId: number): string[] => {
  const tagIds = postsJoinTagsData.PostsJoinTags.filter(
    (pt) => pt.PostId === postId
  ).map((pt) => pt.TagId);
  return tagsData.Tags.filter((tag) => tagIds.includes(tag.Id)).map(
    (tag) => tag.Name
  );
};

const getCategoryForPost = (postCategoryId: number): string | null => {
  const category = categoriesData.PostCategories.find(
    (cat) => cat.Id === postCategoryId
  );
  return category ? category.Title : null;
};

const getImageForPost = (postId: number): string | null => {
  const file = filesData.Files.find(
    (file) => file.Name.includes(postId.toString()) && file.IsImage === 1
  );
  return file ? file.Name : null;
};

// Convert posts to MDX
postsData.Posts.forEach((post) => {
  const tags = getTagsForPost(post.Id);
  const category = getCategoryForPost(post.PostCategoryId);
  const image = getImageForPost(post.Id);

  const frontmatter = `---
title: "${post.Title}"
date: "${post.CreatedOn}"
summary: "${post.Abstract}"
tags: ${JSON.stringify(tags)}
category: "${category}"
image: "${image}"
---

${post.HtmlContent}
`;

  const mdxFilePath = path.join(outputDir, `${post.Id}.mdx`);
  fs.writeFileSync(mdxFilePath, frontmatter, "utf-8");
  console.log(`Generated MDX file for post ID: ${post.Id}`);
});

console.log("All posts have been converted to MDX files.");
