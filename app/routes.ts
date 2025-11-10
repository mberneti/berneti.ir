import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':id', 'routes/post-redirect.tsx'),
  route(':id/:slug', 'routes/post.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('categories', 'routes/categories.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
