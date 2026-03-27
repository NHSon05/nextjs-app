# Async/await

## 1. Async/await là gì? Hướng dẫn sử dụng Async/await trong dự án React

- Xử lý tác vụ **bất đồng bộ**, dựa trên Promise.
- `async`: Đặt trước một hàm, key này sẽ biến hàm đó thành một hàm bất đồng bộ
  > Luôn trả về Promise
- `await`: Được dùng bên trong hàm async để _chờ_ Promise hoàn thành trước khi tiếp tục
  thực thi các dòng lệnh tiếp theo.

Bạn có thể hiểu đơn giản:

- async/await giúp code bất đồng bộ của bạn trông giống như mã đồng bộ.
- Thay vì xử lý .then() hoặc .catch(), bạn dùng try...catch để bắt lỗi.

**Vấn đề**

- Cú pháp rườm rà. Có quá nhiều lệnh `.then` lồng nhau.
- callback hell.

> Async/Await chính là giải pháp giúp xử lý bất đồng bộ

## 2. Tại sao nên sử dụng Async/Await

- Gọn gàng code hơn, dễ theo dõi luồng thực thi.
- Có thể sử dụng try...catch giúp bắt và xử lý lỗi ở mọi nơi, thay vì sử dụng thêm .catch() sau mỗi Promise
- Có thể hoạt động trong React, Node.

**Khi nào nên sử dụng async/await**

- Khi call api để lấy data.
- Cần sử dụng các tác vụ bất đồng bộ như truy xuất csdl, handle file.
- Thay thế các code promise .then() bằng cú pháp dễ đọc hơn.
