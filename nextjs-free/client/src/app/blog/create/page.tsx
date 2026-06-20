// src/app/blog/create/page.tsx
'use client'

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
// import { createPostAction, FormState } from './actions';
import Link from 'next/link';
import { createPostAction, FormState } from '../action';

const initialState: FormState = {
  success: false,
  message: '',
};

export default function CreatePostPage() {
  // Nhận vào Server Action và Trạng thái ban đầu
  const [state, formAction] = useActionState(createPostAction, initialState);

  return (
    <div className="p-10 max-w-md mx-auto">
      <div className="mb-6">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold mt-2">Tạo bài viết mới</h1>
      </div>

      {/* Gắn formAction thẳng vào thuộc tính action */}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề</label>
          <input 
            name="title" 
            type="text" 
            className="w-full border p-2 rounded-lg bg-background" 
            placeholder="Nhập tiêu đề bài viết..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nội dung</label>
          <textarea 
            name="content" 
            className="w-full border p-2 rounded-lg bg-background" 
            rows={5} 
            placeholder="Nhập nội dung chi tiết..."
          />
        </div>

        {/* Nút bấm quản lý trạng thái loading nằm riêng bên dưới */}
        <SubmitButton />

        {/* Chỉ hiển thị thông báo nếu có lỗi (vì nếu thành công nó sẽ nhảy trang luôn) */}
        {state.message && !state.success && (
          <p className="mt-4 text-sm text-red-600 font-medium">
            ⚠️ {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

// Component con để sử dụng hook useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition hover:bg-blue-700"
    >
      {pending ? 'Đang đăng bài viết...' : 'Đăng bài'}
    </button>
  );
}