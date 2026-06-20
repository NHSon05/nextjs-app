export const websites = [
  {
    name: 'Google',
    url: 'https://www.google.com',
    description: 'A web search engine developed by Google.'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    description: 'A social networking site.'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    description: 'A video sharing platform.'
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com',
    description: 'A microblogging and social networking service.'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    description: 'A professional networking platform.'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    description: 'A photo and video sharing social networking service.'
  },
  {
    name: 'Wikipedia',
    url: 'https://www.wikipedia.org',
    description: 'A free online encyclopedia.'
  },
  {
    name: 'Amazon',
    url: 'https://www.amazon.com',
    description:
      'An online marketplace, manufacturer of e-book readers, and Web services provider.'
  },
  {
    name: 'WhatsApp',
    url: 'https://www.whatsapp.com',
    description:
      'A freeware, cross-platform messaging and Voice over IP service.'
  },
  {
    name: 'Tencent QQ',
    url: 'https://www.qq.com',
    description: 'An instant messaging software service and web portal.'
  }
]


// src/lib/data.ts

// Khai báo kiểu dữ liệu cho bài viết
export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
}

// Khởi tạo mảng chứa dữ liệu giả lập giống như một Database thu nhỏ
export const POSTS: Post[] = [
  {
    id: "1",
    slug: "huong-dan-nextjs-15",
    title: "Lộ trình học Next.js 15 cho người mới",
    content: "Next.js 15 mang đến nhiều thay đổi về Async Params, React 19 và Server Actions cực kỳ mạnh mẽ...",
    category: "Tech"
  },
  {
    id: "2",
    slug: "typescript-nang-cao",
    title: "Làm chủ TypeScript trong dự án thực tế",
    content: "TypeScript không chỉ là thêm type, nó giúp bạn hạn chế tới 90% lỗi vặt khi viết code JavaScript...",
    category: "Programming"
  },
  {
    id: "3",
    slug: "tailwind-css-tips",
    title: "10 mẹo dùng Tailwind CSS cực hay",
    content: "Tailwind giúp bạn code giao diện nhanh gấp 3 lần bình thường nhờ hệ thống utility classes...",
    category: "Frontend"
  }
];