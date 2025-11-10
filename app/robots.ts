import { APP_CONFIG } from "@/app-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${APP_CONFIG.BASE_URL}/sitemap.xml`,
  };
}
