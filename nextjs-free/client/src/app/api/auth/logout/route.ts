import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = cookies()
    cookieStore.delete('sessionToken')
    return Response.json({ message: 'Đăng xuất thành công' }, { status: 200 })
}
