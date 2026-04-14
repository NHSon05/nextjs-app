import { z } from 'zod'

// Thử log ra để kiểm tra trong Console của trình duyệt
console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})

if (!configProject.success) {
  console.error('Lỗi cấu hình .env:', configProject.error.issues)
  throw new Error('Các giá trị khai báo trong .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig