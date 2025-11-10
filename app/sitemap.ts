import { APP_CONFIG } from "@/app-config";
import { urls } from "@/utils/urls";
import { getBlogPosts } from "@/utils/utils";

export default async function sitemap() {
  const blogs = (await getBlogPosts()).map((post) => ({
    url: `${APP_CONFIG.BASE_URL}${urls.post(post.id, post.slug)}`,
    lastModified: post.metadata.date,
  }));

  const routes = ["", "/"].map((route) => ({
    url: `${APP_CONFIG.BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
