import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const cookieStore = cookies()
        const sessionToken = (await cookieStore).get('sessionToken')?.value

        if (!sessionToken) {
            return NextResponse.json({message: "Không tìm thấy token"}, {status: 400})
        }

        (await cookieStore).delete('sessionToken')
        return NextResponse.json({message: "Đăng xuất thành công"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Có lỗi xảy ra"}, {status: 500})
    }
}
