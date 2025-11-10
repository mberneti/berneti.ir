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
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">{title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(publishedTime)}
        </p>
      </div>
      <article className="prose bg-[#1b1b1b99]">
        <CustomMDX source={post.content} />
      </article>
      <h4 className="mt-14 mb-4 font-bold text-l">
        فهرست مطالب « {post.metadata.category} »
      </h4>
      <ul className="flex-col space-y-2">
        {posts
          .filter((p) => p.metadata.category === post.metadata.category)
          .map((p) => (
            <li key={p.id} className="flex justify-start items-baseline">
              <div className="h-[2px] w-3 ml-2 block bg-gradient-to-l from-subText from-50% shrink-0"></div>
              <Link to={urls.post(p.id, p.slug)} className="text-text text-sm">
                {p.metadata.title}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
