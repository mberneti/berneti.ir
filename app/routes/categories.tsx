import { Link } from 'react-router';
import { getBlogPosts } from '@/utils/posts.ts';
import { urls } from '@/utils/urls.ts';

export default function CategoriesPage() {
  const posts = getBlogPosts();
  const categories = posts.reduce((acc, post) => {
    const category = post.metadata.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <>
      <header className="mb-10">
        <h1 className="text-xl font-black tracking-wide mb-2">دسته‌بندی‌ها</h1>
      </header>

      <div className="space-y-8 w-full max-w-3xl">
        {Object.keys(categories).map((category, index) => (
          <div key={index} className="space-y-2 mb-4">
            <h2 className="font-black text-success">{category}</h2>
            <ul className="pl-4 space-y-2 text-sm">
              {categories[category].map((p, idx) => (
                <li
                  key={idx}
                  className="hover:text-secondary transition duration-200 cursor-pointer flex justify-start items-center"
                >
                  <div className="h-[1px] w-3 ml-2 block bg-gradient-to-l from-subText from-50%"></div>
                  <Link to={urls.post(p.id, p.slug)}>{p.metadata.title}</Link>
                </li>
              ))}
            </ul>
            <div className="h-[1px] w-full ml-3 block bg-gradient-to-l from-subText from-0%"></div>
          </div>
        ))}
      </div>
    </>
  );
}
