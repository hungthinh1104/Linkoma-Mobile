# 📱 Linkoma Mobile

Ứng dụng quản lý cư dân và tòa nhà, phát triển bằng **React Native + Expo**. Dành cho cư dân, quản lý, và quản trị viên – tích hợp nhiều tính năng: phản ánh, hoá đơn, tiện ích, sự kiện cộng đồng, và hơn thế nữa.

---

## 🚀 Tính năng chính

| Role       | Tính năng                                                        |
| ---------- | ---------------------------------------------------------------- |
| 🢍 Cư dân  | Xem hóa đơn, phản ánh, đặt chỗ giữ xe, theo dõi sự kiện          |
| 🚰 Quản lý | Phê duyệt phản ánh, quản lý tiện ích, thống kê hoạt động         |
| 🛡️ Admin  | Phân quyền, quản lý toàn hệ thống, kiểm tra dữ liệu và thiết lập |

---

## 🛠️ Công nghệ sử dụng

* ⚛️ **React Native** (với Expo)
* 🧝 **React Navigation** (v6+)
* 🎨 **React Native Paper** (UI library)
* 💡 **TypeScript**
* ☁️ **Backend API** (REST hoặc GraphQL tùy hệ thống)
* 🧼 **Redux / Zustand** *(nếu có)*

---

## 📂 Cấu trúc thư mục

```
src/
│
├── assets/                  # Ảnh, biểu tượng, font
├── components/              # Các component tái sử dụng
│   └── quickAccess/
├── features/                # Theo vai trò người dùng
│   ├── resident/
│   ├── manager/
│   └── admin/
│
├── navigation/              # Điều hướng theo từng stack/tab
│   └── resident/
│       ├── tabs/
│       └── stacks/
│
├── services/                # Gọi API hoặc xử lý logic nghiệp vụ
├── constants/               # Màu sắc, font, kiểu dữ liệu chuẩn
└── utils/                   # Hàm tiện ích
```

---

## ⚙️ Hướng dẫn cài đặt & chạy app

### 1. Clone project

```bash
git clone https://github.com/your-username/linkoma-mobile.git
cd linkoma-mobile
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Chạy ứng dụng

```bash
npx expo start
```

> Mở app Expo Go trên điện thoại và quét QR code để chạy thử.

---

## 🔐 Môi trường `.env`

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Đảm bảo bạn đã điền các thông số như:

```env
API_BASE_URL=https://api.linkoma.vn
GOOGLE_MAPS_API_KEY=your_key_here
```

---

## 🦖 TODO & Roadmap

* [x] UI cư dân (bảng điều khiển, phản ánh, hóa đơn)
* [ ] Tích hợp xác thực OTP
* [ ] Kết nối API thật
* [ ] Thêm chế độ offline / cache
* [ ] Dark mode

---

## 📸 Ảnh minh họa

> *(Thêm ảnh demo UI, video hoặc GIF demo app tại đây nếu có)*

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp!
Bạn có thể mở issue, tạo pull request, hoặc gửi ý tưởng.

```bash
git checkout -b feature/your-feature
git commit -m "✨ add your feature"
git push origin feature/your-feature
```

---

## 🧑‍💻 Tác giả

* Dịp Hưng Thịnh
