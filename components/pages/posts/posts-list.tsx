import { Link } from "react-router";
import { getBlogPosts } from "@/utils/posts";
import { Flex } from "@/components/core/Flex";
import { Typography } from "@/components/core/Typography";
import { PostDate } from "@/components/pages/posts/post-date";
import { urls } from "@/utils/urls";

export function BlogPosts() {
  const allBlogs = getBlogPosts();
  return (
    <Flex flexDirection="flex-col" ySpacing="space-y-4">
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link key={post.id} to={urls.post(post.id, post.slug)}>
            <Flex xSpacing="space-x-5" alignItems="items-start">
              <PostDate date={post.metadata.date} />
              <Typography>{post.metadata.title}</Typography>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
}
