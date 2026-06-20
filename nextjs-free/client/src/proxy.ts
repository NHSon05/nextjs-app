// Đóng vai trò như một người gác cổng cho toàn bộ web. 
// Hoạt động ở tầng Edge ( Ngay trước khi request chạm vào Server Components hay các trang cụ thể) để xử lý việc Phân quyền và Điều hướng (Authentication & Authorization).)


import { NextRequest, NextResponse } from "next/server";

const privatePaths = ['/me']
const authPaths = ['/login', '/register']

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value
    // Check private path
    if (privatePaths.some(path => pathname.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (authPaths.some(path => pathname.startsWith(path) && sessionToken)) {
        return NextResponse.redirect(new URL('/me', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/me', '/login', '/register']
}

/*
- Cái này gọi là Bộ lọc. Nếu không có matcher, hàm proxy sẽ chạy lặp đi lặp lại cho mọi request trên website (kể cả lúc tải ảnh, tải file CSS, JavaScript...), gây chậm hệ thống.

- Bằng cách khai báo matcher, bạn đang dặn Next.js: "Chỉ kích hoạt người gác cổng này khi người dùng truy cập vào đúng 3 đường dẫn: /me, /login, hoặc /register".

- 🦅 Tổng kết hình tượng cho dễ nhớ:
- File proxy.ts này giúp bạn viết logic bảo mật tập trung tại một nơi. Thay vì vào từng file page.tsx của /me, /login để viết code kiểm tra cookie rất mệt mỏi và dễ sót, 
bạn cấu hình tại đây và Next.js sẽ tự động chạy ngầm để bảo vệ toàn bộ các tuyến đường (routes) được chỉ định.
 */