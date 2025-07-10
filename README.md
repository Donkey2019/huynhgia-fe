# HuynhGia Farm - Quản lý nhập xuất nông trại

## Công nghệ sử dụng
- [Vue.js 3](https://vuejs.org/) (Composition API)
- Vite (dev server)
- Fetch API (giao tiếp backend)
- CSS thuần
- **AI Assistant (ChatGPT):** Hỗ trợ tư vấn, phát triển, tối ưu code và tài liệu dự án

## Yêu cầu môi trường
- Node.js >= 16
- npm >= 8

## Cài đặt
1. **Clone source code:**
   ```bash
   git clone <repo-url>
   cd huynhgia-fe
   ```
2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

## Chạy ứng dụng
- **Chạy dev:**
  ```bash
  npm run dev
  ```
  Ứng dụng sẽ chạy mặc định tại [http://localhost:5173](http://localhost:5173)

- **Build production:**
  ```bash
  npm run build
  ```

## Cấu hình kết nối backend
- File cấu hình: `src/config.js`
- Mặc định:
  ```js
  export default {
    EXPORT_API_URL: 'http://localhost:8080/api',
  };
  ```
- Để kết nối backend khác, sửa giá trị `EXPORT_API_URL` cho phù hợp.

## Liên hệ
- Nếu gặp lỗi hoặc cần hỗ trợ, vui lòng liên hệ quản trị viên dự án.
