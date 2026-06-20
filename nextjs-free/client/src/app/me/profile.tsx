"use client"

import React, { useEffect, useState } from 'react'
import envConfig from '@/config'
import { toast } from 'sonner'
import { 
  User, 
  Mail, 
  Sparkles, 
  Flame, 
  Database, 
  ShieldAlert, 
  BookOpen, 
  Award, 
  Calendar, 
  Save, 
  CheckCircle,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import accountApiRequest from '../api-requests/account'
import { useAppContext } from '@/app/AppProvider'

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'account'>('overview')
  const { sessionToken } = useAppContext()
  
  // States for dynamic user loading
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!sessionToken) return
      try { 
        setIsLoading(true)
        const result = await accountApiRequest.me(sessionToken)
        const userData = result.payload.data
        setUser(userData)
        setName(userData.name)
      } catch (error: any) {
        console.error('Failed to load user profile:', error)
        toast.error(error.message || 'Không thể tải thông tin hồ sơ')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [  ])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Tên không được để trống')
      return
    }

    setIsUpdating(true)
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ name })
      })

      const payload = await res.json()
      if (!res.ok) {
        throw new Error(payload.message || 'Cập nhật thất bại')
      }

      // Update local state to reflect change instantly in dashboard banner
      setUser(prev => prev ? { ...prev, name } : null)
      toast.success('Cập nhật hồ sơ thành công!')
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra')
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <p className="text-sm text-slate-500 font-medium">Đang tải thông tin học viên...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 border border-border/40 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
        <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Không tìm thấy thông tin</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Vui lòng đăng nhập lại để truy cập phòng học.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      
      {/* Student Banner/Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-extrabold shadow-inner">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-200 text-[11px] font-semibold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-orange-400 mr-1" />
              <span>Học viên Vàng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{user.name}</h2>
            <p className="text-teal-100/80 text-sm flex items-center justify-center sm:justify-start">
              <Mail className="h-4 w-4 mr-1.5 shrink-0" />
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-border/40 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 border-b-2 transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Tổng quan học tập
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`pb-4 border-b-2 transition-all cursor-pointer ${
            activeTab === 'account'
              ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Cài đặt tài khoản
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main learning status (Left column) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Courses progress cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span>Khóa học đang học</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Course 1 */}
                <div className="bg-white dark:bg-slate-900 border border-border/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">Next.js App Router Masterclass</span>
                  <h4 className="text-base font-bold mt-1 line-clamp-1">Xây dựng ứng dụng hoàn chỉnh từ A-Z</h4>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Tiến trình</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">75%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs">
                    Tiếp tục học
                  </Button>
                </div>

                {/* Course 2 */}
                <div className="bg-white dark:bg-slate-900 border border-border/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">Next.js Advanced Caching & API</span>
                  <h4 className="text-base font-bold mt-1 line-clamp-1">Quản lý state, tối ưu hóa SEO và CDN</h4>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Tiến trình</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">40%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs">
                    Tiếp tục học
                  </Button>
                </div>

              </div>
            </div>

            {/* Quick stats grid */}
            <div className="bg-white dark:bg-slate-900 border border-border/40 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-base font-bold">Mục tiêu học tập tuần này</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-350">Hoàn thành chương 4: Server Actions & Dynamic Forms</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-350">Triển khai dự án lên Vercel để tối ưu hóa ISR Caching</span>
                </div>
                <div className="flex items-center space-x-3 text-sm opacity-60">
                  <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0" />
                  <span className="line-through text-slate-500">Thực hành call API /account/me sử dụng Authorization header</span>
                </div>
              </div>
            </div>

          </div>

          {/* Gamified accomplishments column (Right column) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-border/40 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <Award className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <span>Huy hiệu đạt được</span>
              </h3>

              <div className="space-y-4">
                
                {/* Badge 1 (unlocked) */}
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
                  <div className="h-9 w-9 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">RSC Explorer</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Đã làm chủ kiến trúc Server Components cơ bản.</p>
                  </div>
                </div>

                {/* Badge 2 (unlocked) */}
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <div className="h-9 w-9 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Action Runner</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Đã gọi thành công mutation qua Server Actions.</p>
                  </div>
                </div>

                {/* Badge 3 (unlocked) */}
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                  <div className="h-9 w-9 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Caching Architect</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Cấu hình thành công revalidation cho trang.</p>
                  </div>
                </div>

                {/* Badge 4 (locked) */}
                <div className="flex items-start space-x-3 p-3 rounded-xl opacity-50 bg-slate-100 dark:bg-slate-800">
                  <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Auth Protector</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Khóa - Hoàn thành bài học Middleware nâng cao để mở.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Account Tab content */
        <div className="max-w-xl bg-white dark:bg-slate-900 border border-border/40 p-8 rounded-2xl shadow-sm">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <h3 className="text-lg font-bold">Thông tin cá nhân</h3>
            
            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-350">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <Input 
                  type="text"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-10 transition-all focus-visible:ring-teal-500"
                  placeholder="Nguyen Van A"
                />
              </div>
            </div>

            {/* Read-only email field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-350">Email đăng ký</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <Input 
                  type="email"
                  value={user.email} 
                  disabled
                  className="pl-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-500 border-border/40 cursor-not-allowed"
                />
              </div>
              <p className="text-[11px] text-slate-400 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Email đăng ký không thể tự sửa đổi vì lý do bảo mật.
              </p>
            </div>

            {/* Submit btn */}
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center justify-center space-x-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </Button>

          </form>
        </div>
      )}

    </div>
  )
}
