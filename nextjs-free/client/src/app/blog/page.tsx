// src/app/blog/page.tsx
import { POSTS } from '@/lib/data';
import Link from 'next/link';

export default async function BlogListPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Danh sách bài viết</h1>
        <Link 
          href="/blog/create" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Viết bài mới
        </Link>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <div key={post.id} className="p-5 border rounded-xl shadow-sm bg-card">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h2>
            <p className="text-muted-foreground whitespace-pre-line">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}