# Fetching data

- Cách fetch data trong Server và Client Component

## Server Component

- Fetch data sử dụng method đồng bộ I/O như là
  - fetch Api
  - ORM hoặc database

### Fetch API

- Sử dụng fetchApi

```javascript
export default async function Page() {
  const data = await fetch(
    "[https://api.vercel.app/blog](https://api.vercel.app/blog)",
  );
  const posts = await data.json();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

- Sử dụng **use cache** để lưu vào bộ nhớ cache
- Bọc thành phần tìm nạp trong `<Suspense></Suspense>` để truyền dữ liệu mới tại thời diểm đã yêu cầu.

### Với ORM hoặc database

**ORM (Object-Relational Mapping) là gì?**

- Là kỹ thuật giúp thao tác với CSDL bằng NNLT thay vì các lệnh _SQL_ đơn giản.
- Là _thông dịch_ giúp kết nối với database.

```javascript
import { db, posts } from "@/lib/db";

export default async function Page() {
  const allPosts = await db.select().from(posts);
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Streaming

- Có thể dữ liệu trong _Server Component_.
  **Vấn đề**: Khi có dữ liệu bị chậm. Toàn bộ route sẽ bị chặn render cho tới khi lấy xong.
  **Giải pháp**: Chia trang thành nhiều phần nhỏ hơn và gửi dần từ thành phần đó từ _client_ tới _server_
  => Đây gọi là tải dữ liệu theo luồng **(streaming)**

Sử dụng Suspense:

- Hiểu đơn giản: Suspense là _hộp_ để bao bọc các Component nào cần thời gian để tải dữ liệu.
- Trong lúc chờ đợi, nó hiển thị UI thay thế _Loading_

## Client Component

- Có 2 cách để fetch data trong Client Component, sử dụng:
  - _React's use API_
  - Thư viện SWR haowjc _React Query_

### Streaming data với use API
