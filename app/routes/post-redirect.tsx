import { redirect } from "react-router";
import type { Route } from "./+types/post-redirect";
import { getPostById } from "@/utils/posts";

export function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  const post = getPostById(id || "");

  if (!post) {
    throw redirect("/");
  }

  throw redirect(`/${id}/${encodeURI(post.slug)}`);
}

export default function PostRedirect() {
  // This should never be rendered because the loader always redirects
  return null;
}
