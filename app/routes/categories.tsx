import { Link } from "react-router";
import { getBlogPosts } from "@/utils/posts.ts";
import { urls } from "@/utils/urls.ts";

export default function CategoriesPage() {
  const posts = getBlogPosts();
  const categories = posts.reduce(
    (acc, post) => {
      const category = post.metadata.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>
  );

  const sortedCategories = Object.entries(categories).sort(
    ([, a], [, b]) => b.length - a.length
  );

  return (
    <>
      <header className="mb-12">
        <h1 className="text-3xl font-black tracking-wide mb-3 bg-gradient-to-l from-accent to-primary bg-clip-text text-transparent">
          دسته‌بندی‌ها
        </h1>
        <p className="text-secondary text-sm">
          مجموعه‌ای از {posts.length} نوشته در {sortedCategories.length} دسته‌بندی
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {sortedCategories.map(([category, categoryPosts], index) => (
          <div
            key={index}
            className="group relative border border-subText/20 rounded-lg p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 bg-gradient-to-br from-background to-background/50"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-xl text-success group-hover:text-accent transition-colors duration-300">
                {category}
              </h2>
              <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 rounded-full bg-success/10 text-success text-sm font-bold group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                {categoryPosts.length}
              </span>
            </div>

            {/* Decorative line */}
            <div className="h-[2px] w-12 mb-4 bg-gradient-to-l from-success/50 to-transparent group-hover:from-accent/50 group-hover:w-20 transition-all duration-300"></div>

            {/* Posts List */}
            <ul className="space-y-3">
              {categoryPosts.map((p, idx) => (
                <li
                  key={idx}
                  className="group/item relative"
                >
                  <Link
                    to={urls.post(p.id, p.slug)}
                    className="flex items-start gap-3 text-sm text-text/80 hover:text-accent transition-all duration-200 py-1"
                  >
                    <span className="text-subText group-hover/item:text-accent transition-colors duration-200 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="leading-relaxed group-hover/item:translate-x-1 transition-transform duration-200 inline-block">
                      {p.metadata.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/0 to-primary/0 group-hover:from-accent/5 group-hover:to-primary/5 pointer-events-none transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </>
  );
}
