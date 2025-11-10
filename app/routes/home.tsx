import { BlogPosts } from '@/components/pages/posts/posts-list.tsx';

export default function HomePage() {
  return (
    <>
      <span className="mb-10 text-xl font-black tracking-wide">مطالب</span>
      <BlogPosts />
    </>
  );
}
