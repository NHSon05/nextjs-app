import { POSTS } from '@/lib/data';
import Link from 'next/link'
import { notFound } from 'next/navigation';

// Định nghĩa kiểu cho params theo chuẩn nextjs
interface Props {
    params: Promise<{slug: string}>
}

export default async function BlogPostPage({params} : Props) {
    // 1. PHẢI AWAIT PARAMS
    const { slug } = await params;

    // 2. TÌM BÀI VIẾT TRONG DATA DỰA TRÊN SLUG
    const post = POSTS.find((p) => p.slug === slug);

    // 3. NẾU KHÔNG CÓ BÀI VIẾT NÀO KHỚP VỚI SLUG, NHẢY SANG TRANG 404
    if (!post) {
        notFound()
    }

    return (
        <div className='p-10 max-w-2xl mx-auto'>
            <Link href='/blog'>Quay lại</Link>
            <header className='mb-8'>
                <span className="text-blue-500 font-medium">{post.category}</span>
                <h1 className="text-4xl font-extrabold mt-2">{post.title}</h1>
            </header>
            <div className="prose lg:prose-xl">
                <p className="text-lg leading-relaxed text-gray-700">
                    {post.content}
                </p>
            </div>
            <div className="mt-10 pt-6 border-t text-sm text-gray-400">
                ID bài viết: {post.id}
            </div>
        </div>
    )
}
