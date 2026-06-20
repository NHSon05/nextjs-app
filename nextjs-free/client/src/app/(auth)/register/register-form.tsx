"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/app/api-requests/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react"
import { useAppContext } from "@/app/AppProvider"

const RegisterForm = () => {   
  const router = useRouter()
  const { setSessionToken } = useAppContext()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: RegisterBodyType) {
    try {
      // 1. Gọi API đăng ký từ helper
      const result = await authApiRequest.register(values)

      // 2. Ghi session token vào cookie bằng route local /api/auth
      await authApiRequest.auth({
        sessionToken: result.payload.data.token
      })

      // 3. Set token trong context và chuyển hướng
      const token = result.payload.data.token
      setSessionToken(token)
      toast.success('Đăng ký tài khoản thành công!')
      
      router.push('/me')
      router.refresh()
    } catch (error: any) {
      console.error(error)
      const status = error.status as number
      
      if (status === 422) {
        const errors = error.payload.errors as { field: string; message: string }[]
        errors.forEach((err) => {
          form.setError(err.field as 'name' | 'email' | 'password' | 'confirmPassword', {
            type: 'server',
            message: err.message
          })
        })
      } else {
        const msg = error?.payload?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
        toast.error(msg)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        noValidate
      >
        {/* Name Field */}
        <FormField 
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-semibold">Tên học viên</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <FormControl>
                  <Input 
                    placeholder="Nguyen Van A" 
                    className={`pl-10 h-10 transition-all focus-visible:ring-teal-500 ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs text-red-500 font-medium" />
            </FormItem> 
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-semibold">Email</FormLabel>
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

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-semibold">Nhập lại mật khẩu</FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <FormControl>
                  <Input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="******" 
                    className={`pl-10 pr-10 h-10 transition-all focus-visible:ring-teal-500 ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
          className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none mt-4"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Đang đăng ký...</span>
            </span>
          ) : (
            'Đăng ký tài khoản'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
