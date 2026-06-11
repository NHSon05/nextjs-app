"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import envConfig from '@/config'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppContext } from '@/app/AppProvider'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'

export default function LoginForm() {
  const { setSessionToken } = useAppContext()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: LoginBodyType) {
    try {
      // 1. Call standard API login endpoint
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, 
        {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      ).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })

      // 2. Call Next.js route handler to set cookies HTTP-only
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })

      // Fix bug: Properly assign token to context AFTER successful API cookies response
      const token = resultFromNextServer?.payload?.data?.token
      setSessionToken(token)
      toast.success('Đăng nhập thành công!')
      
      router.push('/me')
      router.refresh()
    } catch (error: any) {
      console.error(error)
      const status = error.status as number
      
      if (status === 422) {
        const errors = error.payload.errors as { field: string; message: string }[]
        errors.forEach((err) => {
          form.setError(err.field as 'email' | 'password', {
            type: 'server',
            message: err.message
          })
        })
      } else {
        const msg = error?.payload?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.'
        toast.error(msg)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full"
        noValidate
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-semibold">Email học viên</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="name@domain.com" 
                    className={`pl-10 h-10 transition-all focus-visible:ring-teal-500 ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-semibold">Mật khẩu</FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <FormControl>
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="******" 
                    className={`pl-10 pr-10 h-10 transition-all focus-visible:ring-teal-500 ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...field} 
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FormMessage className="text-xs text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none mt-2"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Đang đăng nhập...</span>
            </span>
          ) : (
            'Đăng nhập'
          )}
        </Button>
      </form>
    </Form>
  )
}
