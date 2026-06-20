import Link from 'next/link'
import RegisterForm from './register-form'
import { GraduationCap } from 'lucide-react'

export default function RegisterPage() {
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
          Đăng ký học viên
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tạo tài khoản để bắt đầu hành trình học tập Next.js chuyên nghiệp
        </p>
      </div>
 
      {/* Register Card Form wrapper */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-border/40 shadow-md">
        <RegisterForm />
      </div>

      {/* Toggle option */}
      <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Đã có tài khoản học viên?{' '}
        <Link 
          href="/login" 
          className="underline underline-offset-4 font-semibold hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          Đăng nhập
        </Link>
      </p>

    </div>
  )
}
