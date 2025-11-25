import { BlogPosts } from '@/components/pages/posts/posts-list.tsx';
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-16 relative">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-gradient-to-l from-accent via-primary to-success bg-clip-text text-transparent animate-gradient">
            سلام، من برنتی هستم
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-6 max-w-2xl">
            توسعه‌دهنده‌ی وب و علاقه‌مند به هوش مصنوعی. در این وبلاگ تجربیات و یادگیری‌هایم رو با شما به اشتراک می‌ذارم.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/about"
              className="px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 font-bold"
            >
              درباره من
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 font-bold"
            >
              تماس با من
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-l from-accent/30 via-primary/30 to-transparent mb-12"></div>

      {/* Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-wide bg-gradient-to-l from-accent to-primary bg-clip-text text-transparent">
            آخرین مطالب
          </h2>
          <Link
            to="/categories"
            className="text-sm text-secondary hover:text-accent transition-colors duration-200"
          >
            مشاهده دسته‌بندی‌ها ←
          </Link>
        </div>
        <BlogPosts />
      </section>
    </>
  );
}
