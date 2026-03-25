import { POSTS } from '@/lib/data'
import Link from 'next/link'

export default function BlogListPage() {
  return (
    <div>
        <h1>Tất cả bài viết</h1>
        <div>
            {POSTS.map((post) => (
                <div key={post.id} className="border p-4 rounded-lg hover:shadow-md transition">
                    <h2 className="text-xl font-semibold text-blue-600">
                        <Link href={`blog/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 uppercase">
                        {post.category}
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}
