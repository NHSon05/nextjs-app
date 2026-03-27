# NextJS render component như thế nào?

Component ở đây gồm Server Component và Client Component

## Khi chúng ta build

Mọi component dù là Server Component hay Client Component khi build đều có

- Static HTML
- JS Bundle
- Ngoài ra còn có CSS Bundle, Image, Font,..

## Khi Request lần đầu tiên

1.  Server Next.js render Server Component và nó kết hợp với Client Component -> HTML gửi về client
2.  Client thấy website nhưng chưa tương tác được với nó.
3.  Trong JS Bundle Download về có chứa **React Server Component Payload (RSC Payload)**
    dùng để render lại component ở client, cập nhật DOM
4.  Cuối cùng thêm các event vào các client compoent để tương tác với user => Bước này gọi
    là Hydration, sau này có thể tương tác vơi trang website.

> React Server Component Payload là 1 data đặc biệt được render ở phía Server phục vụ cho việc đồng bộ, cập nhật DOM giữa client và server

## Khi Request lần thứ 2. (Subsequent Navigations)

Ví dụ chúng ta nav từ `/home` sang `/about`

Thì server Nextjs sẽ không trả về HTML mà cho chúng ta nữa mà trả React Server Component Payload
và các bundle JS, CSS cần thiết

Client sữ tự render ra HTMl

Điều này giúp navigation nhanh hơn, nhưng vẫn đảm bảo về SEO
