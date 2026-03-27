# Promise

## Promise là gì?

- Promise là 1 Object chứa giá trị tương lai của tác vụ bất đồng bộ.
  Ví dụ: Nếu ta yêu cầu một số dữ liệu từ Server, promise hứa với chúng ta sẽ lấy dữ liệu
  chúng ta có thể sử dụng trong tương lai.

**3 trạng thái của Promise**

- Pending (_unresolved_): Promise đang chờ xử lý nếu chưa có kết quả, nó đang chờ cái gì đó để kết thúc.
- Fullfilled (_resolved_): Promise giải quyết được nếu có kết quả.
- Rejected (_rejected_): Promise từ chối nếu xảy ra lỗi.

**Vấn đề**

- JS là một NNLT đơn luồng, có nghĩa là chỉ có thể có 1 điều có thể xảy ra tại một không đồng bộ
  Ví dụ: netword request
- Trước khi chưa sử dụng Promise. Đã có 1 hiện tượng là _callback hell_

## Promise ra đời giải quyết được vấn đề gì?

- Tránh được _callback hell_.
- Làm cho code trông sạch hơn và đọc dễ hiểu hơn.

Lấy 1 code không đồng bộ bằng cách sử dụng callback như sau:

```javascript
getData(function (x) {
  console.log(x);
  getMoreData(x, function (y) {
    getSomeMoreData(y, function (z) {
      console.log(z);
    });
  });
});
```

> Qua đoạn code, ta thấy hàm getData() nhận dữ liệu từ 1 hàm callback.
> Trong hàm callback thì nó lại có thêm 1 hàm getMoreData() khác
> Hàm này nhận kết quả trả về của hàm trước đó. Thì ta gọi đó là callback hell.
> Nơi mỗi callback được lồng trong 1 callback khác và mỗi callback phụ thuộc vào cha mẹ nó

**Code**
Ta có thể viết lại đoạn code trên như sau

```javascript
getData(){
    .then((x) => {
        console.log(x)
        return GetMoreData(x)
    })
    .then((y) => {
        console.log(y)
        return getSomeMoreData(y);
    })
    .then((z) => {
        console.log(z);
    })
}
```

> Thay vì làm hình phểu. Thì mình flatten cho nó thành 1 chuỗi từ trên xuống dưới

**Ưu điểm:**

- Cấu trúc Flatten
- Xử lý lỗi tập trung
- Tính linh hoạt

**Hạn chế:**

- Scope: Ở bước cuối cùng `(.then((z) =>....))` không thể truy cập tới biến x
- Cú pháp rườm rà.
- Khó debug
