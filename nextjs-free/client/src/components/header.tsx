"use client"

import React, { useState } from 'react'
import { ModeToggle } from './toggle-theme'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { GraduationCap, LogOut, User, LayoutDashboard, Home, BookOpen } from 'lucide-react'
import { Button } from './ui/button'
import { useAppContext } from '@/app/AppProvider'

export default function Header() {
  const router = useRouter()
  const [isLogginOut, setIsLoggingout] = useState(false)
  const { sessionToken, setSessionToken } = useAppContext()

  const handleLogout = async () => {
    setIsLoggingout(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      if (res.ok) {
        setSessionToken("")
        router.push('/login')
        router.refresh()
      } else {
        alert("Đăng xuất thât bại")
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng xuất')
      console.error(error)
    } finally {
      setIsLoggingout(false)
    }
  }


  const token = sessionToken
  console.log(token)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-95 transition-opacity">
          <GraduationCap className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-300">
            NextDev
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="flex items-center space-x-1 text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Home className="h-4 w-4" />
            <span>Trang chủ</span>
          </Link>
          <Link href="/#courses" className="flex items-center space-x-1 text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <BookOpen className="h-4 w-4" />
            <span>Khóa học</span>
          </Link>
          {token && (
            <Link href="/me" className="flex items-center space-x-1 text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <LayoutDashboard className="h-4 w-4" />
              <span>Học tập</span>
            </Link>
          )}
        </nav>

        {/* Action Buttons & Theme toggle */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          
          {token ? (
            <div className="flex items-center space-x-3">
              <Button asChild variant="outline" size="sm" className="hidden sm:flex items-center space-x-1 border-teal-600/30 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-teal-700 dark:text-teal-300">
                <Link href="/me">
                  <User className="h-4 w-4 mr-1" />
                  Hồ sơ
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center space-x-1">
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm" className="text-foreground/80 hover:text-teal-600 dark:hover:text-teal-400">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
