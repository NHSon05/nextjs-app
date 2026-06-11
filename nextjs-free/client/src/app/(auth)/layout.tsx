import React from 'react'
import { CheckCircle2, GraduationCap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-slate-950">
      
      {/* Decorative Branding Column (Left) */}
      <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden flex-col justify-between p-10 text-white bg-gradient-to-br from-teal-900 via-slate-950 to-cyan-950 border-r border-border/20">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-teal-400 font-bold text-lg hover:opacity-90">
            <ArrowLeft className="h-4 w-4" />
            <span>Về trang chủ</span>
          </Link>
        </div>

        <div className="relative z-10 my-auto space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/30">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Nâng tầm kỹ năng lập trình với Next.js
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Học tập qua các dự án thực tế, làm chủ các khái niệm nâng cao như React Server Components, Server Actions, Caching và bảo mật nâng cao.
          </p>

          <ul className="space-y-3 pt-4">
            <li className="flex items-center space-x-3 text-sm text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
              <span>Bài học chất lượng cao, thực hành ngay</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
              <span>Xây dựng các dự án Fullstack hoàn chỉnh</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
              <span>Chứng chỉ hoàn thành được công nhận</span>
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} NextDev Learning Platform.
        </div>
      </div>

      {/* Auth Form Column (Right) */}
      <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {children}
        </div>
      </div>

    </div>
  )
}
