// src/app/blog/actions.ts
'use server'

import { POSTS } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Định nghĩa kiểu dữ liệu cho State của Form
export interface FormState {
  success: boolean;
  message: string;
}

export async function createPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // Giả lập delay mạng cho giống thật
  await new Promise((res) => setTimeout(res, 1000));

  // Lấy dữ liệu từ các ô input thông qua thuộc tính 'name'
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Validate cơ bản
  if (!title || !content) {
    return { success: false, message: 'Vui lòng điền đầy đủ thông tin!' };
  }

  // Thêm vào "Database" giả lập của chúng ta
  POSTS.push({
    id: Date.now().toString(),
    slug: title.toLowerCase().replace(/ /g, '-'),
    title,
    content,
    category: 'Tech'
  });

  // Cực kỳ quan trọng: Bảo Next.js xóa cache của trang danh sách để cập nhật bài mới
  revalidatePath('/blog');
  redirect('/blog')

  return { success: true, message: 'Tạo bài viết thành công!' };
}