import Link from 'next/link'
import LoginForm from './login-form'
import { GraduationCap } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="w-full space-y-6">
      
      {/* Title section */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex lg:hidden justify-center items-center space-x-2 text-primary pb-4">
          <GraduationCap className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-300">
            NextDev
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Chào mừng trở lại
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Nhập email và mật khẩu của bạn để truy cập lớp học
        </p>
      </div>

      {/* Login Card Form wrapper */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-border/40 shadow-md">
        <LoginForm />
      </div>

      {/* Toggle option */}
      <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Chưa có tài khoản học viên?{' '}
        <Link 
          href="/register" 
          className="underline underline-offset-4 font-semibold hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          Đăng ký ngay
        </Link>
      </p>

    </div>
  )
}
