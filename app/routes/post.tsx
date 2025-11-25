import { Link, redirect } from "react-router";
import type { Route } from "./+types/post";
import { getBlogPosts, getPostById } from "@/utils/posts.ts";
import { formatDate } from "@/utils/client-utils.ts";
import { CustomMDX } from "@/components/mdx.tsx";
import { APP_CONFIG } from "@/app-config";
import { urls } from "@/utils/urls";

export function loader({ params }: Route.LoaderArgs) {
  const { id, slug } = params;
  const post = getPostById(id || "");

  if (!post) {
    throw redirect("/");
  }

  // Redirect to correct slug if it doesn't match
  if (decodeURI(slug || "") !== post.slug) {
    throw redirect(`/${id}/${encodeURI(post.slug)}`);
  }

  return { post };
}

export function meta({ params }: Route.MetaArgs) {
  const post = getPostById(params.id || "");

  if (!post) {
    return [{ title: "Post Not Found" }];
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? image
    : `${APP_CONFIG.BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return [
    { title: `${title} | ${APP_CONFIG.TITLE}` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: publishedTime },
    { property: "og:url", content: `${APP_CONFIG.BASE_URL}/${post.slug}` },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const posts = getBlogPosts();

  const { title, date: publishedTime } = post.metadata;

  return (
    <section className="w-full">
      <h1 className="title font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-3">
        {title}
      </h1>
      <div className="flex justify-between items-center mb-12 text-sm">
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {formatDate(publishedTime)}
        </p>
      </div>
      <article className="prose prose-lg">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-16 pt-8 border-t border-neutral-800">
        <h4 className="mb-6 font-bold text-xl text-neutral-300">
          فهرست مطالب « {post.metadata.category} »
        </h4>
        <ul className="flex-col space-y-3">
          {posts
            .filter((p) => p.metadata.category === post.metadata.category)
            .map((p) => (
              <li
                key={p.id}
                className="flex justify-start items-baseline group"
              >
                <div className="h-[2px] w-3 ml-2 block bg-gradient-to-l from-accent/50 group-hover:from-accent shrink-0 transition-colors"></div>
                <Link
                  to={urls.post(p.id, p.slug)}
                  className="text-neutral-300 hover:text-accent text-base transition-colors"
                >
                  {p.metadata.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
