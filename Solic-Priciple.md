# Solid Priciple

## 1. Single Responsibility Priciple (SRP)

> Mỗi class chỉ nên có 1 lý do để thay đổi, tức là chịu 1 chức năng duy nhất

- Code dễ hiểu và dễ bảo trì.
- Dễ bảo trì và mở rộng.
- Tái khả năng sử dụng code.
- Dễ unit testing.
- giảm phụ thuộc và xung đột code.

**Khi nào nên áp dụng SRP?**

- Khi class và module chứa quá nhiều func khác nhau
- Bảo trì và mở rộng
- Bảo đảm hệ thống dễ đọc, dễ hiểu.

## 2. Open/Closed Principle (OCP)

- Hạn chế sửa đổi: Không nên chỉnh source code của một module hoặc class có sẵn, vì sẽ làm ảnh hưởng đến tính đúng đắn của chương trình.
- Ưu tiên mở rộng: Khi cần thêm tính năng mới, nên kế thừa và mở rộng module/class có sẵn thành các module con lớn hơn.

Ví dụ

```typescript
class Product {
  calculateTax(type) {
    if (type === "electronic") {
      return 0.15;
    } else if (type === "clothing") {
      return 0.05;
    }
  }
}
```

Có thể sửa thành

```typescript
class Product {
  calculateTax() {
    return 0;
  }
}
class ElectronicProduct extends Product {
  calculateTax() {
    return 0.15;
  }
}
class ClothingProduct extends Product {
  calculateTax() {
    return 0.05;
  }
}
```

- Dễ mở rộng tính năng
- Giảm rủi ro lỗi
- Dễ bảo trì
- Hỗ trợ kiểm thử dễ dàng hơn.

**Khi nào nên áp dụng OCP?**

- Khi hệ thống cần mở rộng các tính năng mà vẫn giữ ổn định.
- Giảm nguy cơ phá vỡ code cũ khi thêm tính năng mới.
- Xây dựng hệ thống theo hướng module và dễ bảo trì.

## 3. Liskov Substitution Principle (LSP)

> Các class con phải có thể thay thế class cha mà không thay đổi tính đúng đắn của chương trình. Có nghĩa là lớp con không nên phá vỡ hành vi lớp cha.

Ví dụ

```typescript
class Bird {
  fly() {
    console.log("Flying");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("I'm flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguin can't fly");
  }
}
// Vi phạm LSP
```

Sửa thành

```typescript
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("I'm flying");
  }
}

class Penguin extends Bird {}
// không có phương thức fly vì penguin không thể bay
```

**Lợi ích**

- Đảm bảo tính đúng đắn của hệ thống.
- Tăng tính linh hoạt.
- Hỗ trợ bảo trì và mở rộng.

**Khi nào nên áp dụng SRP?**

- Khi thiết kế hệ thống dựa trên kế thừa.
- Đảm bảo tính năng sử dụng mà không gây ra lỗi.

## 4. Interface segregation principle (ISP)

> Một class không nên phải phụ thuộc vào những method mà nó không sử dụng. Nên chia nhỏ interface thành các interface cụ thể thay vì tạo ra 1 interface lớn.

**Lợi ích**

- Giảm phụ thuộc không cần thiết.
- Tăng tính linh hoạt.
- Tăng tính dễ đọc và bảo trì.
- Tránh ảnh hưởng tới dây chuyền.

**Khi nào nên sử dụng?**

- Khi một interface trở nên quá lớn hoặc chứa quá nhiều chức năng không liên quan.
- 1 class chỉ cần sử dụng một phần nhỏ trong interface hiện tại.
- Muốn tăng tính linh hoạt và giảm sử phụ thuộc trong hệ thống.

## 5. Dependency Inversion Principle (DIP)

> Các module cấp cao không nên phụ thuộc vào các module cấp thấp mà nên phụ thuộc vào abstraction. Điều này giúp hệ thống dễ bảo trì và mở rộng.

ví dụ:

```typescript
class EmailService {
  sendEmail() {
    console.log("Sending email");
  }
}
class Notification {
  constructor() {
    this.email = new EmailService();
  }
  notify() {
    this.emailService.sendEmail();
  }
}
```

**Lợi ích**

- Tăng tính linh hoạt.
- Giảm sự phụ thuộc giữa các module.
- Cải thiện khả năng tái sử dụng.
